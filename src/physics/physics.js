import {player, cS, drawVfx, percentShake, stage, playerType, edgeOffset, versusMode, showDebug, deepCopyObject, gameMode} from "main/main";
import {Vec2D, Box2D,framesData} from "main/characters";
import {sounds} from "main/sfx";
import {gameSettings} from "settings";
import {aS, turboAirborneInterrupt, turboGroundedInterrupt, turnOffHitboxes} from "./actionStateShortcuts";
import {getLaunchAngle, getHorizontalVelocity, getVerticalVelocity, getHorizontalDecay, getVerticalDecay} from "physics/hitDetection";
import {lostStockQueue} from 'main/render';
import {getNewMaybeCenterAndTouchingType, coordinateIntercept, additionalOffset} from "physics/environmentalCollision";
/* eslint-disable */


// this is a workaround for the moment because I am being lazy
function customZip ( list, string, start = 0 ) {
  if (list.length === 0) {
    return [];
  }
  else {
    const [head, ...tail] = list;
    return ( [[head, [string, start]]] . concat( customZip(tail, string, start+1) ) ) ;
  }
}



function dealWithCollision(i, newCenter) {
  player[i].phys.pos = newCenter;
};

function dealWithWallCollision (i, newCenter, wallType) {
  player[i].phys.pos = newCenter;

  let wallLabel = "L";
  let sign = -1;
  let isRight = 0;
  if (wallType[0].toLowerCase() === "r") {
    wallLabel = "R";
    sign = 1;
    isRight = 1;
  }

  if (player[i].actionState == "DAMAGEFLYN") {
    if (player[i].hit.hitlag == 0) {
      player[i].phys.face = sign;
      if (player[i].phys.techTimer > 0) {
        if (player[i].inputs.x[0] || player[i].inputs.y[0] || player[i].inputs.lStickAxis[0].y > 0.7) {
          aS[cS[i]].WALLTECHJUMP.init(i);
        } else {
          aS[cS[i]].WALLTECH.init(i);
        }
      } else {
        drawVfx("wallBounce", new Vec2D(player[i].phys.pos.x, player[i].phys.ECBp[1].y), sign, isRight);
        aS[cS[i]].WALLDAMAGE.init(i);
      }
    }
  }
  else if (aS[cS[i]][player[i].actionState].specialWallCollide) {
    aS[cS[i]][player[i].actionState].onWallCollide(i, wallLabel, j);
  }
  else if (player[i].phys.canWallJump) {
    if (player[i].phys.wallJumpTimer == 254) {
      if (player[i].phys.posDelta.x >= 0.5) {
        player[i].phys.wallJumpTimer = 0;
      }
    }
  }
  if (player[i].phys.wallJumpTimer >= 0 && player[i].phys.wallJumpTimer < 120) {
    if (sign * player[i].inputs.lStickAxis[0].x >= 0.7 &&
        sign * player[i].inputs.lStickAxis[3].x <= 0 &&
        player[i].charAttributes.walljump) {
      player[i].phys.wallJumpTimer = 254;
      player[i].phys.face = sign;
      aS[cS[i]].WALLJUMP.init(i);
    } else {
      player[i].phys.wallJumpTimer++;
    }
  }
  
};

function dealWithPlatformCollision(i, alreadyGrounded, newCenter, ecbp0, j) {
  if (player[i].hit.hitlag > 0 || alreadyGrounded) {
    player[i].phys.pos = newCenter;
  } 
  else {
    land(i, ecbp0 , 1, j);
  }
};

function dealWithGroundCollision(i, alreadyGrounded, newCenter, ecbp0, j) {
  if (player[i].hit.hitlag > 0 || alreadyGrounded) {
    player[i].phys.pos = newCenter;
  } 
  else {
    land(i, ecbp0, 0, j);
  }
};


function fallOffGround(i, side, groundEdgePosition) {
  let [stillGrounded, backward] = [true,false]
  let sign = 1;
  if (side === "r") {
    sign = -1;
  }
  if (aS[cS[i]][player[i].actionState].canEdgeCancel) {
    if (player[i].phys.face == sign) {
      stillGrounded = false;
      player[i].phys.pos.y += additionalOffset;
      backward = true;
    } 
    else if (sign * player[i].inputs.lStickAxis[0].x < -0.6 ||
            (player[i].phys.cVel.x == 0 && player[i].phys.kVel.x ==0) ||
             aS[cS[i]][player[i].actionState].disableTeeter ||
             player[i].phys.shielding) {
      stillGrounded = false;
      player[i].phys.pos.y += additionalOffset;
    } 
    else {
      player[i].phys.cVel.x = 0;
      player[i].phys.pos.x = groundEdgePosition.x;
      aS[cS[i]].OTTOTTO.init(i);
    }
  } 
  else if (player[i].phys.cVel.x == 0 &&
             player[i].phys.kVel.x == 0 &&
             !aS[cS[i]][player[i].actionState].inGrab) {
    stillGrounded = false;
    player[i].phys.pos.y += additionalOffset;
  } 
  else {
    player[i].phys.cVel.x = 0;
    player[i].phys.pos.x = groundEdgePosition.x;
  }
  return [stillGrounded, backward];
};


function isGroundToSide(groundTypeAndIndex, side) {
  return false; // for the moment, grounds are never connected
}

// ground type and index is a pair, either ["g", index] or ["p", index]
// this function assumes that grounds/platforms have their leftmost point given first
function dealWithGround(i, ground, groundTypeAndIndex) {
  let [stillGrounded, backward] = [true,false]
  let groundOrPlatform = 0;
  if (groundTypeAndIndex[0] === "p") {
    groundOrPlatform = 1;
  }

  let maybeLeftGroundTypeAndIndex  = isGroundToSide(groundTypeAndIndex,"l");
  let maybeRightGroundTypeAndIndex = isGroundToSide(groundTypeAndIndex,"r");

  if ( player[i].phys.ECBp[0].x < ground[0].x - 0.1) {
    if (maybeLeftGroundTypeAndIndex === false) { // no other ground to the left
      [stillGrounded, backward] = fallOffGround(i, "l", ground[0]);
    }
    else {
      let [leftGroundType, leftGroundIndex] = maybeLeftGroundTypeAndIndex;
      switch (leftGroundType) {
        case "g":
          [stillGrounded, backward] = dealWithGround(i, stage.ground[leftGroundIndex], ["g",leftGroundIndex]);
          break;
        case "p":
          [stillGrounded, backward] = dealWithGround(i, stage.platform[leftGroundIndex], ["p",leftGroundIndex]);
      }
    }
  }
  else if ( player[i].phys.ECBp[0].x > ground[1].x + 0.1) {
    if (maybeRightGroundTypeAndIndex === false) { // no other ground to the right
      [stillGrounded, backward] = fallOffGround(i, "r", ground[1]);
    }
    else {
      let [rightGroundType, rightGroundIndex] = maybeRightGroundTypeAndIndex;
      switch (rightGroundType) {
        case "g":
          [stillGrounded, backward] = dealWithGround(i, stage.ground[rightGroundIndex], ["g",rightGroundIndex]);
          break;
        case "p":
          [stillGrounded, backward] = dealWithGround(i, stage.platform[rightGroundIndex], ["p",rightGroundIndex]);
      }
    }
  }
  else {
    let ecbp0 = player[i].phys.ECBp[0];
    let yIntercept = coordinateIntercept( [ ecbp0, new Vec2D( ecbp0.x , ecbp0.y+1 ) ], ground);
    player[i].phys.pos.y = player[i].phys.pos.y + yIntercept.y - ecbp0.y + additionalOffset;
    player[i].phys.onSurface = [groundOrPlatform, groundTypeAndIndex[1] ]; 
  }
  return [stillGrounded, backward];
};

function dealWithCeilingCollision(i, newCenter, offsets) {
  const newECB2 = new Vec2D (newCenter.x, newCenter.y + offsets[3])
  player[i].phys.pos = newCenter;
  if (aS[cS[i]][player[i].actionState].headBonk) {
    if (player[i].hit.hitstun > 0) {
      if (player[i].phys.techTimer > 0) {
        aS[cS[i]].TECHU.init(i);
      } else {
        drawVfx("ceilingBounce", newECB2, 1);
        sounds.bounce.play();
        aS[cS[i]].STOPCEIL.init(i);
      }
    } else {
      aS[cS[i]].STOPCEIL.init(i);
    }
  }
};


export function land (i,newCenter,t,j){
  player[i].phys.pos = newCenter;
  player[i].phys.grounded = true;
  player[i].phys.doubleJumped = false;
  player[i].phys.jumpsUsed = 0;
  player[i].phys.airborneTimer = 0;
  player[i].phys.fastfalled = false;
  player[i].phys.chargeFrames = 0;
  player[i].phys.charging = false;
  player[i].phys.wallJumpCount = 0;
  player[i].phys.thrownHitbox = false;
  player[i].phys.sideBJumpFlag = true;
  player[i].phys.onSurface = [t, j];
  player[i].phys.onLedge = -1;
  player[i].rotation = 0;
  player[i].rotationPoint = new Vec2D(0, 0);
  player[i].colourOverlayBool = false;
  player[i].hitboxes.active = [false, false, false, false];
  switch (aS[cS[i]][player[i].actionState].landType) {
    case 0:
      // LANDING / NIL
      if (player[i].phys.cVel.y >= -1) {
        aS[cS[i]].WAIT.init(i);
      } else {
        aS[cS[i]].LANDING.init(i);
      }
      break;
    case 1:
      // OWN FUNCTION
      aS[cS[i]][player[i].actionState].land(i);
      break;
    case 2:
      // KNOCKDOWN / TECH
      if (player[i].phys.techTimer > 0) {
        if (player[i].inputs.lStickAxis[0].x * player[i].phys.face > 0.5) {
          aS[cS[i]].TECHF.init(i);
        } else if (player[i].inputs.lStickAxis[0].x * player[i].phys.face < -0.5) {
          aS[cS[i]].TECHB.init(i);
        } else {
          aS[cS[i]].TECHN.init(i);
        }
      } else {
        aS[cS[i]].DOWNBOUND.init(i);
      }
      break;
    default:
      aS[cS[i]].LANDING.init(i);
      break;
  }
  player[i].phys.cVel.y = 0;
  player[i].phys.kVel.y = 0;
  player[i].hit.hitstun = 0;
}

export function physics (i){
  player[i].phys.posPrev = new Vec2D(player[i].phys.pos.x,player[i].phys.pos.y);
  player[i].phys.facePrev = player[i].phys.face;
    deepCopyObject(true,player[i].phys.prevFrameHitboxes,player[i].hitboxes);
  if (player[i].hit.hitlag > 0){
    player[i].hit.hitlag--;
    if (player[i].hit.hitlag == 0 && player[i].hit.knockback > 0) {
      if (player[i].phys.grabbedBy == -1 || player[i].hit.knockback > 50) {
        var newAngle = getLaunchAngle(
          player[i].hit.angle,
          player[i].hit.knockback,
          player[i].hit.reverse,
          player[i].inputs.lStickAxis[0].x,
          player[i].inputs.lStickAxis[0].y,
          i
        );

        player[i].phys.cVel.x = 0;
        player[i].phys.cVel.y = 0;
        //console.log(newAngle);
        player[i].phys.kVel.x = getHorizontalVelocity(player[i].hit.knockback, newAngle);
        player[i].phys.kVel.y = getVerticalVelocity(player[i].hit.knockback, newAngle, player[i].phys.grounded, player[i].hit.angle);
        //console.log(player[i].phys.kVel);
        player[i].phys.kDec.x = getHorizontalDecay(newAngle);
        player[i].phys.kDec.y = getVerticalDecay(newAngle);
        //console.log(player[i].phys.kDec);
        //player[i].hit.hitstun = getHitstun(player[i].hit.knockback);

        player[i].phys.onLedge = -1;
        player[i].phys.charging = false;
        player[i].phys.chargeFrames = 0;
        player[i].phys.shielding = false;
        /*if (player[i].phys.grounded){
          if (newAngle == 0 || newAngle > 270){
            player[i].phys.kVel.y = 0;
            player[i].phys.kDec.x = player[i].charAttributes.traction;
          }
          else if (newAngle > 180){
            player[i].phys.kVel.y = 0;
            player[i].phys.kDec.x = -player[i].charAttributes.traction;
          }
        }*/
        if (player[i].phys.kVel.y == 0) {
          if (player[i].hit.knockback >= 80) {
            player[i].phys.grounded = false;
            player[i].phys.pos.y += 0.0001;
          }
        }
        if (player[i].phys.kVel.y > 0) {
          player[i].phys.grounded = false;
        }
      }
      player[i].hit.knockback = 0;
    }

    //SDI / ASDI
    switch (player[i].actionState) {
      case "DAMAGEN2":
      case "DAMAGEFLYN":
      case "GUARDON":
      case "GUARD":
      case "DOWNDAMAGE":
        if (player[i].hit.hitlag > 0) {
          if ((player[i].inputs.lStickAxis[0].x > 0.7 && player[i].inputs.lStickAxis[1].x < 0.7) ||
              (player[i].inputs.lStickAxis[0].x < -0.7 && player[i].inputs.lStickAxis[1].x > -0.7) ||
              (player[i].inputs.lStickAxis[0].y > 0.7 && player[i].inputs.lStickAxis[1].y < 0.7) ||
              (player[i].inputs.lStickAxis[0].y < -0.7 && player[i].inputs.lStickAxis[1].y > -0.7)) {

            if (!((player[i].inputs.lStickAxis[0].x * player[i].inputs.lStickAxis[0].x) + (player[i].inputs.lStickAxis[0].y * player[i].inputs.lStickAxis[0].y) < (0.49))) {

              player[i].phys.pos.x += player[i].inputs.lStickAxis[0].x * 6;
              player[i].phys.pos.y += player[i].phys.grounded ? 0 : player[i].inputs.lStickAxis[0].y * 6;
            } 
          }
        } else {
          player[i].phys.pos.x += player[i].inputs.lStickAxis[0].x * 3;
          player[i].phys.pos.y += player[i].phys.grounded ? 0 : player[i].inputs.lStickAxis[0].y * 3;
        }
        break;
      default:
        break;
    }
  }
  if (player[i].hit.hitlag == 0) {
    if (player[i].hit.shieldstun > 0) {
      //console.log(player[i].hit.shieldstun);
      player[i].hit.shieldstun--;
      if (player[i].hit.shieldstun < 0) {
        player[i].hit.shieldstun = 0;
      }
    }
    //console.log(aS[cS[i]][player[i].actionState]);
    player[i].phys.canWallJump = aS[cS[i]][player[i].actionState].wallJumpAble;
    player[i].phys.bTurnaroundTimer = Math.max(0, player[i].phys.bTurnaroundTimer - 1);

    if ((player[i].inputs.lStickAxis[0].x > 0.9 && player[i].inputs.lStickAxis[1].x < 0.9) ||
        (player[i].inputs.lStickAxis[0].x < -0.9 && player[i].inputs.lStickAxis[1].x > -0.9)) {

      player[i].phys.bTurnaroundTimer = 20;
      player[i].phys.bTurnaroundDirection = Math.sign(player[i].inputs.lStickAxis[0].x);
    }

    player[i].prevActionState = player[i].actionState;
    aS[cS[i]][player[i].actionState].main(i);

    if (player[i].shocked > 0) {
      player[i].shocked--;
      if (player[i].shocked % 5 == 0) {
        sounds.electricfizz.play();
      }
      drawVfx("shocked", new Vec2D(player[i].phys.pos.x, player[i].phys.pos.y + 5), player[i].phys.face);
    }

    if (player[i].burning > 0) {
      player[i].burning--;
      if (player[i].burning % 6 == 0) {
        drawVfx("burning", new Vec2D(player[i].phys.pos.x, player[i].phys.pos.y + 5), player[i].phys.face)
      }
    }

    // TURBO MODE
    // if just changed action states, remove ability to cancel
    if (player[i].prevActionState != player[i].actionState) {
      player[i].hasHit = false;
    }
    if (gameSettings.turbo) {
      if (player[i].hasHit) {
        if (player[i].actionState != "CATCHATTACK") {
          if (player[i].phys.grounded) {
            if (turboGroundedInterrupt(i)) {
              player[i].hasHit = false;
            }
          } else {
            if (turboAirborneInterrupt(i)) {
              player[i].hasHit = false;
            }
          }
        }
      }

    }

    if (Math.abs(player[i].phys.kVel.x) > 0) {
      var oSign = Math.sign(player[i].phys.kVel.x);
      if (player[i].phys.grounded) {
        player[i].phys.kVel.x -= oSign * player[i].charAttributes.traction;
      } else {
        player[i].phys.kVel.x -= player[i].phys.kDec.x;
      }
      if (oSign != Math.sign(player[i].phys.kVel.x)) {
        player[i].phys.kVel.x = 0;
      }
    }
    if (Math.abs(player[i].phys.kVel.y) > 0) {
      var oSign = Math.sign(player[i].phys.kVel.y);
      if (player[i].phys.grounded) {
        player[i].phys.kVel.y = 0;
      }
      player[i].phys.kVel.y -= player[i].phys.kDec.y;
      if (oSign != Math.sign(player[i].phys.kVel.y)) {
        player[i].phys.kVel.y = 0;
      }
    }

    player[i].phys.pos.x += player[i].phys.cVel.x + player[i].phys.kVel.x;
    player[i].phys.pos.y += player[i].phys.cVel.y + player[i].phys.kVel.y;

  }

  if (player[i].actionState == "REBIRTH" || player[i].actionState == "REBIRTHWAIT") {
    player[i].phys.hurtBoxState = 1;
  } else {
    player[i].phys.hurtBoxState = 0;
  }
  if (player[i].phys.invincibleTimer > 0) {
    player[i].phys.invincibleTimer--;
    player[i].phys.hurtBoxState = 2;
  }
  if (player[i].phys.intangibleTimer > 0) {
    player[i].phys.intangibleTimer--;
    player[i].phys.hurtBoxState = 1;
  }

  if (player[i].phys.outOfCameraTimer >= 60) {
    if (player[i].percent < 150) {
	  player[i].percent++;
	}
    percentShake(40, i);
    sounds.outofcamera.play();
    player[i].phys.outOfCameraTimer = 0;
  }

  var x = player[i].phys.pos.x;
  var y = player[i].phys.pos.y;

  if (!player[i].phys.grounded) {
    player[i].phys.airborneTimer++;
  }

  // if smash 64 lcancel, put any landingattackair action states into landing
  if (gameSettings.lCancelType == 2) {
    if (player[i].phys.lCancel) {
      if (player[i].actionState.substr(0, 16) == "LANDINGATTACKAIR") {
        player[i].actionState = "LANDING";
        player[i].timer = 1;
      }
    }
  }

  if (player[i].phys.lCancelTimer > 0) {
    player[i].phys.lCancelTimer--;
    if (player[i].phys.lCancelTimer == 0) {
      player[i].phys.lCancel = false;
    }
  }
  // l CANCEL
  if (player[i].phys.lCancelTimer == 0 &&
    ((player[i].inputs.lAnalog[0] > 0 && player[i].inputs.lAnalog[1] == 0) ||
     (player[i].inputs.rAnalog[0] > 0 && player[i].inputs.lAnalog[1] == 0) ||
     (player[i].inputs.z[0] && !player[i].inputs.z[1]))) {

    // if smash 64 lcancel, increase window to 11 frames
    if (gameSettings.lCancelType == 2) {
      player[i].phys.lCancelTimer = 11;
    } else {
      player[i].phys.lCancelTimer = 7;
    }
    player[i].phys.lCancel = true;
  }

  // if auto lcancel is on, always lcancel
  if (gameSettings.lCancelType == 1) {
    player[i].phys.lCancel = true;
  }

  // V Cancel
  if (player[i].phys.vCancelTimer > 0) {
    player[i].phys.vCancelTimer--;
  }

  if (player[i].phys.techTimer > 0) {
    player[i].phys.techTimer--;
  }

  if (player[i].phys.shoulderLockout > 0) {
    player[i].phys.shoulderLockout--;
  }

  if ((player[i].inputs.l[0] && !player[i].inputs.l[1]) ||
      (player[i].inputs.r[0] && !player[i].inputs.r[1])) {

    if (!player[i].phys.grounded) {
      if (player[i].phys.shoulderLockout == 0) {
        player[i].phys.vCancelTimer = 3;
        player[i].phys.techTimer = 20;
      }
    }

    player[i].phys.shoulderLockout = 40;
  }

  /*if (player[i].actionState == 11){
    player[i].phys.ECBp = [new Vec2D(0+x,1+y),new Vec2D(3+x,9+y),new Vec2D(0+x,14+y),new Vec2D(-3+x,9+y)];
  }
  else if (player[i].actionState == 24){
    player[i].phys.ECBp = [new Vec2D(0+x,1+y),new Vec2D(2+x,9+y),new Vec2D(0+x,14+y),new Vec2D(-2+x,9+y)];
  }*/


  //console.log(player[i].timer);
  var frame = Math.floor(player[i].timer);
  if (frame == 0) {
    frame = 1;
  }
  if (frame > framesData[cS[i]][player[i].actionState]) {
    frame = framesData[cS[i]][player[i].actionState];
  }
  //console.log(aS[cS[i]][player[i].actionState].name+" "+(frame-1));
  var ecbOffset = ecb[cS[i]][player[i].actionState][frame - 1];
  if (aS[cS[i]][player[i].actionState].dead) {
    ecbOffset = [0, 0, 0, 0];
  }
  /*switch (player[i].actionState){
    case 26:
    case 27:
    case 28:
    case 29:
      ecbOffset = [0,0,0,0];
      break;
    default:
      break;
  }*/

  if (player[i].phys.grounded || player[i].phys.airborneTimer < 10) {
    ecbOffset[0] = 0;
  }

  player[i].phys.ECBp = [
    new Vec2D(0 + x, ecbOffset[0] + y),
    new Vec2D(ecbOffset[1] + x, ecbOffset[2] + y),
    new Vec2D(0 + x, ecbOffset[3] + y),
    new Vec2D(ecbOffset[1] * -1 + x, ecbOffset[2] + y)
  ];


  if (!aS[cS[i]][player[i].actionState].ignoreCollision) {

    const alreadyGrounded = player[i].phys.grounded;
    let stillGrounded = true;

    // ------------------------------------------------------------------------------------------------------
    // grounded state movement

    if (alreadyGrounded) {

      let relevantGroundIndex = player[i].phys.onSurface[1];
      let relevantGroundType = "g";
      let relevantGround = stage.ground[relevantGroundIndex];
       
      if (player[i].phys.onSurface[0] == 1) {
        relevantGroundType = "p";
        relevantGround = stage.platform[relevantGroundIndex];
      }
      
      let relevantGroundTypeAndIndex = [relevantGroundType, relevantGroundIndex];

      let backward = false;
      [stillGrounded, backward] = dealWithGround(i, relevantGround, relevantGroundTypeAndIndex);

    }

    // end of grounded state movement
    // ------------------------------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------------------------------
    // main collision detection routine

    var notTouchingWalls = [true, true];

    // the following lines should be precalculated instead of being recalculated every frame
    const stageWalls = customZip(stage.wallL,"l").concat( customZip(stage.wallR,"r") );
    const stageGrounds = customZip(stage.ground,"g");
    const stageCeilings =customZip(stage.ceiling,"c");
    const stagePlatforms = customZip(stage.platform, "p");

    let relevantSurfaces = stageWalls;

    const notIgnoringPlatforms = ( !aS[cS[i]][player[i].actionState].canPassThrough || (player[i].inputs.lStickAxis[0].y > -0.56) );
    if ( notIgnoringPlatforms ) {
        relevantSurfaces = relevantSurfaces.concat(stagePlatforms);
    }
    if (!alreadyGrounded) {
      relevantSurfaces = relevantSurfaces.concat(stageCeilings).concat(stageGrounds);
    }

    let surfacesMaybeCenterAndTouchingType = getNewMaybeCenterAndTouchingType(player[i].phys.ECBp, player[i].phys.ECB1, player[i].phys.pos, relevantSurfaces);

    if (surfacesMaybeCenterAndTouchingType === false) {
      // no collision, do nothing
    }
    else {
      if (surfacesMaybeCenterAndTouchingType[1] === false ) {
        // collision but player no longer touching surface
        dealWithCollision(i, surfacesMaybeCenterAndTouchingType[0]);
      }
      else {
        const ecbp0 = new Vec2D ( player[i].phys.ECBp[0].x + surfacesMaybeCenterAndTouchingType[0].x - player[i].phys.pos.x
                                , player[i].phys.ECBp[0].y + surfacesMaybeCenterAndTouchingType[0].y - player[i].phys.pos.y);
        switch(surfacesMaybeCenterAndTouchingType[1][0][0].toLowerCase()) {
          case "l": // player touching left wall, or left ceiling-wall hybrid
            notTouchingWalls[0] = false;
            dealWithWallCollision(i, surfacesMaybeCenterAndTouchingType[0], "l");
            break;
          case "r": // player touching right wall, or right ceiling-wall hybrid
            notTouchingWalls[1] = false;
            dealWithWallCollision(i, surfacesMaybeCenterAndTouchingType[0], "r");
            break;
          case "g": // player landed on ground
            dealWithGroundCollision(i, alreadyGrounded, surfacesMaybeCenterAndTouchingType[0], ecbp0, surfacesMaybeCenterAndTouchingType[1][1]);
            break;
          case "c": // player touching ceiling
            dealWithCeilingCollision(i, surfacesMaybeCenterAndTouchingType[0], ecbOffset);
            break;
          case "p": // player landed on platform
            dealWithPlatformCollision(i, alreadyGrounded, surfacesMaybeCenterAndTouchingType[0], ecbp0, surfacesMaybeCenterAndTouchingType[1][1]);
          default:
            console.log("error: unrecognised surface type, not left/right/ground/ceiling/platform")
            break;
        }
      }
    }

    // end of main collision detection routine
    // ------------------------------------------------------------------------------------------------------

    if (notTouchingWalls[0] && notTouchingWalls[1] && player[i].phys.canWallJump) {
      player[i].phys.wallJumpTimer = 254;
    }
    if (!notTouchingWalls[0] || !notTouchingWalls[1]) {
      if (player[i].phys.grounded) {
        var s = player[i].phys.onSurface[1];
        var surface = player[i].phys.onSurface[0] ? stage.platform[s] : stage.ground[s];
        if (player[i].phys.pos.x < surface[0].x - 0.1 || player[i].phys.pos.x > surface[1].x + 0.1) {
          stillGrounded = false;
        }
      }
    }
    if (!stillGrounded) {
      player[i].phys.grounded = false;
      if (typeof aS[cS[i]][player[i].actionState].airborneState !== 'undefined') {
        player[i].actionState = aS[cS[i]][player[i].actionState].airborneState;
      } else {
        if (aS[cS[i]][player[i].actionState].missfoot && backward) {
          aS[cS[i]].MISSFOOT.init(i);
        } else {
          aS[cS[i]].FALL.init(i);
        }
        if (Math.abs(player[i].phys.cVel.x) > player[i].charAttributes.aerialHmaxV) {
          player[i].phys.cVel.x = Math.sign(player[i].phys.cVel.x) * player[i].charAttributes.aerialHmaxV;
        }
      }
      player[i].phys.shielding = false;
    }
    if (player[i].phys.grounded) {
      for (var j = 0; j < 4; j++) {
        if (playerType[j] > -1) {
          if (i != j) {
            if (player[j].phys.grounded &&
                player[j].phys.onSurface[0] == player[i].phys.onSurface[0] &&
                player[j].phys.onSurface[1] == player[i].phys.onSurface[1]) {

              if (player[i].phys.grabbing != j && player[i].phys.grabbedBy != j) {
                // TODO: this pushing code needs to account for players on slanted surfaces
                var diff = Math.abs(player[i].phys.pos.x - player[j].phys.pos.x);
                if (diff < 6.5 && diff > 0) {
                  player[j].phys.pos.x += Math.sign(player[i].phys.pos.x - player[j].phys.pos.x) * -0.3;
                } else if (diff == 0 && Math.abs(player[i].phys.cVel.x) > Math.abs(player[j].phys.cVel.x)) {
                  player[j].phys.pos.x += Math.sign(player[i].phys.cVel.x) * -0.3;
                }
              }
            }
          }
        }
      }
    }

    if (player[i].phys.shielding == false) {
      player[i].phys.shieldHP += 0.07;
      if (player[i].phys.shieldHP > 60) {
        player[i].phys.shieldHP = 60;
      }
    }

  } // END OF IGNORE COLLISION CHECK

  /*for (var j=0;j<stage.ground.length;j++){
    if (player[i].phys.ECBp[1].x > stage.ground[j][0].x && player[i].phys.ECBp[1].x < stage.ground[j][1].x && player[i].phys.ECBp[1].y > stage.ground[j][0].y && player[i].phys.ECBp[0].y < stage.ground[j][0].y && player[i].phys.ECBp[0].y > stage.ceiling[j][0].y){
      console.log("top left corner");
      player[i].phys.pos.x = stage.ground[j][0].x-(ecbOffset[1]*(stage.ground[j][0].y - player[i].phys.ECBp[0].y)/ecbOffset[2]);
    }
    else if (player[i].phys.ECBp[3].x < stage.ground[j][1].x && player[i].phys.ECBp[3].x > stage.ground[j][0].x && player[i].phys.ECBp[3].y > stage.ground[j][1].y && player[i].phys.ECBp[0].y < stage.ground[j][1].y && player[i].phys.ECBp[0].y > stage.ceiling[j][1].y){
      console.log("top right corner");
    }
  }*/

  player[i].phys.ledgeSnapBoxF = new Box2D(
    [
      player[i].phys.pos.x,
      player[i].phys.pos.y + player[i].charAttributes.ledgeSnapBoxOffset[2]
    ],
    [
      player[i].phys.pos.x + player[i].charAttributes.ledgeSnapBoxOffset[0],
      player[i].phys.pos.y + player[i].charAttributes.ledgeSnapBoxOffset[1]
    ]
  );

  player[i].phys.ledgeSnapBoxB = new Box2D(
    [
      player[i].phys.pos.x - player[i].charAttributes.ledgeSnapBoxOffset[0],
      player[i].phys.pos.y + player[i].charAttributes.ledgeSnapBoxOffset[2]
    ],
    [
      player[i].phys.pos.x,
      player[i].phys.pos.y + player[i].charAttributes.ledgeSnapBoxOffset[1]
    ]
  );


  if (player[i].phys.ledgeRegrabCount) {
    player[i].phys.ledgeRegrabTimeout--;
    if (player[i].phys.ledgeRegrabTimeout == 0) {
      player[i].phys.ledgeRegrabCount = false;
    }
  }

  var lsBF = -1;
  var lsBB = -1;
  if (player[i].phys.onLedge == -1 && !player[i].phys.ledgeRegrabCount) {
    for (var j = 0; j < stage.ledge.length; j++) {
      var ledgeAvailable = true;
      for (var k = 0; k < 4; k++) {
        if (playerType[k] > -1) {
          if (k != i) {
            if (player[k].phys.onLedge == j) {
              ledgeAvailable = false;
            }
          }
        }
      }
      if (ledgeAvailable && !player[i].phys.grounded && player[i].hit.hitstun <= 0) {
        var x = (stage.ledge[j][1]) ? stage.box[stage.ledge[j][0]].max.x : stage.box[stage.ledge[j][0]].min.x;
        var y = stage.box[stage.ledge[j][0]].max.y;

        if (x > player[i].phys.ledgeSnapBoxF.min.x &&
            x < player[i].phys.ledgeSnapBoxF.max.x &&
            y < player[i].phys.ledgeSnapBoxF.min.y &&
            y > player[i].phys.ledgeSnapBoxF.max.y) {

          if (stage.ledge[j][1] == 0) {
            if (aS[cS[i]][player[i].actionState].canGrabLedge[0]) {
              lsBF = j;
            }
          } else if (aS[cS[i]][player[i].actionState].canGrabLedge[1]) {
            lsBF = j;
          }
        }
        if (x > player[i].phys.ledgeSnapBoxB.min.x &&
            x < player[i].phys.ledgeSnapBoxB.max.x &&
            y < player[i].phys.ledgeSnapBoxB.min.y &&
            y > player[i].phys.ledgeSnapBoxF.max.y) {

          if (stage.ledge[j][1] == 1) {
            if (aS[cS[i]][player[i].actionState].canGrabLedge[0]) {
              lsBB = j;
            }
          } else if (aS[cS[i]][player[i].actionState].canGrabLedge[1]) {
            lsBB = j;
          }
        }
      }
      if (player[i].phys.cVel.y < 0 && player[i].inputs.lStickAxis[0].y > -0.5) {
        if (lsBF > -1) {
          if (stage.ledge[lsBF][1] * -2 + 1 == player[i].phys.face || aS[cS[i]][player[i].actionState].canGrabLedge[1]) {
            player[i].phys.onLedge = lsBF;
            player[i].phys.ledgeRegrabTimeout = 30;
            player[i].phys.face = stage.ledge[lsBF][1] * -2 + 1;
            player[i].phys.pos = new Vec2D(stage.box[stage.ledge[lsBF][0]].min.x + edgeOffset[0][0], stage.box[stage.ledge[
              lsBF][0]].min.y + edgeOffset[0][1]);
            aS[cS[i]].CLIFFCATCH.init(i);
          }
        } else if (lsBB > -1) {
          if (stage.ledge[lsBB][1] * -2 + 1 == player[i].phys.face || aS[cS[i]][player[i].actionState].canGrabLedge[1]) {
            player[i].phys.onLedge = lsBB;
            player[i].phys.ledgeRegrabTimeout = 30;
            player[i].phys.face = stage.ledge[lsBB][1] * -2 + 1;
            player[i].phys.pos = new Vec2D(stage.box[stage.ledge[lsBB][0]].max.x + edgeOffset[1][0], stage.box[stage.ledge[
              lsBB][0]].min.y + edgeOffset[1][1]);
            aS[cS[i]].CLIFFCATCH.init(i);
          }
        }
      }
    }
  }

  if (!aS[cS[i]][player[i].actionState].dead && player[i].actionState != "SLEEP") {
    var state = 0;
    if (player[i].phys.pos.x < stage.blastzone.min.x) {
      state = "DEADLEFT";
    } else if (player[i].phys.pos.x > stage.blastzone.max.x) {
      state = "DEADRIGHT";
    } else if (player[i].phys.pos.y < stage.blastzone.min.y) {
      state = "DEADDOWN";
    } else if (player[i].phys.pos.y > stage.blastzone.max.y && player[i].phys.kVel.y >= 2.4) {
      state = "DEADUP";
    }
    if (state != 0) {
      player[i].phys.outOfCameraTimer = 0;
      turnOffHitboxes(i);
      player[i].stocks--;
      player[i].colourOverlayBool = false;
        lostStockQueue.push([i,player[i].stocks,0]);
      if (player[i].stocks == 0 && versusMode){
        player[i].stocks = 1;
      }
      aS[cS[i]][state].init(i);
    }
  }

  var x = player[i].phys.pos.x;
  var y = player[i].phys.pos.y;

  player[i].phys.hurtbox = new Box2D(
    [
      -player[i].charAttributes.hurtboxOffset[0] + x,
      player[i].charAttributes.hurtboxOffset[1] + y
    ],
    [
      player[i].charAttributes.hurtboxOffset[0] + x,
      y
    ]
  );

  // check collisions and stuff
  /*if (player[i].actionState == 11){
    player[i].phys.ECB1 = [new Vec2D(0+x,1+y),new Vec2D(3+x,9+y),new Vec2D(0+x,14+y),new Vec2D(-3+x,9+y)];
  }
  else if (player[i].actionState == 24){
    player[i].phys.ECB1 = [new Vec2D(0+x,1+y),new Vec2D(2+x,9+y),new Vec2D(0+x,14+y),new Vec2D(-2+x,9+y)];
  }*/
  //player[i].phys.ECB1 = [new Vec2D(0+x,ecbOffset[0]+y),new Vec2D(ecbOffset[1]+x,ecbOffset[2]+y),new Vec2D(0+x,ecbOffset[3]+y),new Vec2D(ecbOffset[1]*-1+x,ecbOffset[2]+y)];

  player[i].phys.ECB1 = [
    new Vec2D(0 + x, (ecbOffset[0] * 10 + y * 10) / 10),
    new Vec2D((ecbOffset[1] * 10 + x * 10) / 10, (ecbOffset[2] * 10 + y * 10) / 10),
    new Vec2D((0 + x * 10) / 10, (ecbOffset[3] * 10 + y * 10) / 10),
    new Vec2D((ecbOffset[1] * -1 * 10 + x * 10) / 10, (ecbOffset[2] * 10 + y * 10) / 10)
  ];

  if (player[i].phys.grounded || player[i].phys.airborneTimer < 10) {
    player[i].phys.ECB1[0].y = 0 + y;
  }

  /*else if (player[i].phys.grounded || player[i].phys.airborneTimer < 10){
    player[i].phys.ECB1 = [new Vec2D(0+x,0+y),new Vec2D(3+x,7+y),new Vec2D(0+x,14+y),new Vec2D(-3+x,7+y)];
  }
  else {
    player[i].phys.ECB1 = [new Vec2D(0+x,4+y),new Vec2D(3+x,9+y),new Vec2D(0+x,14+y),new Vec2D(-3+x,9+y)];
  }*/

  if (gameMode == 3 && player[i].phys.posPrev.y > -80 && player[i].phys.pos.y <= -80) {
    sounds.lowdown.play();
  }

  player[i].phys.isInterpolated = false;
  for (var j = 0; j < 4; j++) {
    if (player[i].hitboxes.active[j] && player[i].phys.prevFrameHitboxes.active[j]) {
      var h1 = new Vec2D(
        player[i].phys.posPrev.x + (player[i].phys.prevFrameHitboxes.id[j].offset[player[i].phys.prevFrameHitboxes.frame].x * player[i].phys.facePrev),
        player[i].phys.posPrev.y + player[i].phys.prevFrameHitboxes.id[j].offset[player[i].phys.prevFrameHitboxes.frame].y
      );

      var h2 = new Vec2D(
        player[i].phys.pos.x + (player[i].hitboxes.id[j].offset[player[i].hitboxes.frame].x * player[i].phys.face),
        player[i].phys.pos.y + player[i].hitboxes.id[j].offset[player[i].hitboxes.frame].y
      );

      var a = h2.x - h1.x;
      var b = h2.y - h1.y;
      if (a == 0 || b == 0) {
        var x = 0;
      } else {
        var x = Math.atan(Math.abs(a) / Math.abs(b));
      }
      var opp = Math.sin(x) * player[i].hitboxes.id[j].size;
      var adj = Math.cos(x) * player[i].hitboxes.id[j].size;
      var sigma = [h1.x,h1.y];
      if ((a>0 && b>0) || (a<=0 && b<=0)){
        var alpha1 = new Vec2D((sigma[0] + adj),(sigma[1] - opp));
        var alpha2 = new Vec2D((alpha1.x + a), (alpha1.y + b));
        var beta1 = new Vec2D((sigma[0] - adj),(sigma[1] + opp));
        var beta2 = new Vec2D((beta1.x + a),(beta1.y + b));
      }
      else {
        var alpha1 = new Vec2D((sigma[0] - adj),(sigma[1] - opp));
        var alpha2 = new Vec2D((alpha1.x + a), (alpha1.y + b));
        var beta1 = new Vec2D((sigma[0] + adj),(sigma[1] + opp));
        var beta2 = new Vec2D((beta1.x + a),(beta1.y + b));
      }
      player[i].phys.interPolatedHitbox[j] = [alpha1,alpha2,beta2,beta1];

      var opp = Math.sin(x) * player[i].hitboxes.id[j].size - gameSettings.phantomThreshold;
      var adj = Math.cos(x) * player[i].hitboxes.id[j].size - gameSettings.phantomThreshold;
      var sigma = [h1.x,h1.y];
      if ((a>0 && b>0) || (a<=0 && b<=0)){
        var alpha1 = new Vec2D((sigma[0] + adj),(sigma[1] - opp));
        var alpha2 = new Vec2D((alpha1.x + a), (alpha1.y + b));
        var beta1 = new Vec2D((sigma[0] - adj),(sigma[1] + opp));
        var beta2 = new Vec2D((beta1.x + a),(beta1.y + b));
      }
      else {
        var alpha1 = new Vec2D((sigma[0] - adj),(sigma[1] - opp));
        var alpha2 = new Vec2D((alpha1.x + a), (alpha1.y + b));
        var beta1 = new Vec2D((sigma[0] + adj),(sigma[1] + opp));
        var beta2 = new Vec2D((beta1.x + a),(beta1.y + b));
      }
      player[i].phys.interPolatedHitboxPhantom[j] = [alpha1,alpha2,beta2,beta1];
      player[i].phys.isInterpolated = true;
    }
  }

  player[i].phys.posDelta = new Vec2D(
    Math.abs(player[i].phys.pos.x - player[i].phys.posPrev.x),
    Math.abs(player[i].phys.pos.y - player[i].phys.posPrev.y)
  );

  if (showDebug) {
    document.getElementById('actState' + i).innerHTML = player[i].currentAction + " " + player[i].currentSubaction + " : " + player[i].actionState;
    document.getElementById('stateNum' + i).innerHTML = frame;
    document.getElementById('face' + i).innerHTML = player[i].phys.face;
    document.getElementById("velocityX" + i).innerHTML = player[i].phys.cVel.x.toFixed(5);
    document.getElementById("velocityY" + i).innerHTML = player[i].phys.cVel.y.toFixed(5);
    document.getElementById("kvelocityX" + i).innerHTML = player[i].phys.kVel.x.toFixed(5);
    document.getElementById("kvelocityY" + i).innerHTML = player[i].phys.kVel.y.toFixed(5);
    document.getElementById("pvelocityX" + i).innerHTML = player[i].phys.pos.x.toFixed(5);
    document.getElementById("pvelocityY" + i).innerHTML = player[i].phys.pos.y.toFixed(5);
  }
}
