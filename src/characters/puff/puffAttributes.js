charAttributes[1] = {
  dashFrameMin : 12,
  dashFrameMax : 23,
  dInitV : 1.31,
  dMaxV : 1.1,
  dAccA : 0.065,
  dAccB : 0.02,
  dTInitV : 1.4,
  traction : 0.09,
  maxWalk : 0.7,
  jumpSquat : 5,
  sHopInitV : 1.05,
  fHopInitV : 1.6,
  gravity : 0.064,
  groundToAir : 1,
  jumpHmaxV : 1.35,
  jumpHinitV : 0.7,
  airMobA : 0.09,
  airMobB : 0.19,
  aerialHmaxV : 1.35,
  airFriction : 0.05,
  fastFallV : 1.6,
  terminalV : 1.3,
  walkInitV : 0.16,
  walkAcc : 0.1,
  walkMaxV : 0.7,
  djMultiplier : 0,
  djMomentum : 0,
  shieldScale : 13.125,
  modelScale : 0.94,
  weight : 60,
  waitAnimSpeed : 1,
  walljump : false,
  hurtboxOffset : [6,13],
  ledgeSnapBoxOffset : [14,8,18],
  shieldOffset : [0,22],
  charScale : 0.24,
  miniScale : 0.168,
  runTurnBreakPoint : 16,
  airdodgeIntangible : 25,
  wallJumpVelX : 1.3,
  wallJumpVelY : 2.4,
  shieldBreakVel : 10,
  multiJump : true,
  ecbscale : 2.6
}

  // start, length
  intangibility[1] = {
  "ESCAPEAIR" : [4,25],
  "ESCAPEB" : [4,16],
  "ESCAPEF" : [2,17],
  "ESCAPEN" : [2,14],
  "DOWNSTANDN" : [1,23],
  "DOWNSTANDB" : [1,20],
  "DOWNSTANDF" : [1,18],
  "TECHN" : [1,20],
  "TECHB" : [1,20],
  "TECHF" : [1,20]
  }

  frames[1] = {
  "WAIT" : 464,
  "DASH" : 23,
  "RUN" : 16,
  "RUNBRAKE" : 19,
  "RUNTURN" : 25,
  "WALK" : 45,
  "JUMPF" : 52,
  "JUMPB" : 52,
  "FALL" : 8,
  "FALLAERIAL" : 8,
  "FALLSPECIAL" : 8,
  "SQUAT" : 7,
  "SQUATWAIT" : 40,
  "SQUATRV" : 10,
  "JUMPAERIALF" : 50,
  "JUMPAERIALB" : 50,
  "PASS" : 30,
  "GUARDON" : 8,
  "GUARDOFF" : 14,
  "CLIFFCATCH" : 7,
  "CLIFFWAIT" : 60,
  "DAMAGEFLYN" : 60,
  "DAMAGEFALL" : 30,
  "DAMAGEN2" : 11,
  "LANDINGATTACKAIRF" : 20,
  "LANDINGATTACKAIRB" : 20,
  "LANDINGATTACKAIRU" : 20,
  "LANDINGATTACKAIRD" : 30,
  "LANDINGATTACKAIRN" : 20,
  "ESCAPEB" : 34,
  "ESCAPEF" : 34,
  "ESCAPEN" : 27,
  "DOWNBOUND" : 26,
  "DOWNWAIT" : 59,
  "DOWNSTANDN" : 30,
  "DOWNSTANDB" : 35,
  "DOWNSTANDF" : 35,
  "TECHN" : 26,
  "TECHB" : 40,
  "TECHF" : 40,
  "SHIELDBREAKFALL" : 27,
  "SHIELDBREAKDOWNBOUND" : 26,
  "SHIELDBREAKSTAND" : 30,
  "FURAFURA" : 100,
  "CAPTUREWAIT" : 130,
  "CATCHWAIT" : 30,
  "CAPTURECUT" : 30,
  "CATCHCUT" : 29,
  "CAPTUREDAMAGE" : 20,
  "WALLDAMAGE" : 31,
  "WALLTECH" : 31,
  "WALLJUMP" : 40,
  "OTTOTTO" : 12,
  "OTTOTTOWAIT" : 63,
  "THROWNMARTHUP" : 7,
  "THROWNMARTHBACK" : 4,
  "THROWNMARTHFORWARD" : 8,
  "THROWNMARTHDOWN" : 8,
  "THROWNPUFFUP" : 4,
  "THROWNPUFFBACK" : 14,
  "THROWNPUFFFORWARD" : 9,
  "THROWNPUFFDOWN" : 60,
  "THROWNFOXUP" : 4,
  "THROWNFOXBACK" : 5,
  "THROWNFOXFORWARD" : 10,
  "THROWNFOXDOWN" : 32,
  "FURASLEEPSTART" : 33,
  "FURASLEEPLOOP" : 76,
  "FURASLEEPEND" : 76,
  "STOPCEIL" : 8,
  "TECHU" : 25
  }

  actionSounds[1] = {
  "JUMP" : [],
  "ESCAPEAIR" : [],
  "JUMPAERIAL" : [],
  "GUARDON" : [],
  "GUARDOFF" : [],
  "CLIFFCATCH" : [[1,"puffledgegrab"],[1,"puffshout5"]],
  "DEAD" : [[1,"puffdeath"]],
  "FURAFURA" : [],
  "ESCAPEB" : [],
  "ESCAPEF" : [],
  "ESCAPEN" : [],
  "OTTOTTOWAIT" : []
  }

// HITBOX OFFSETS

offsets[1] = {
  fair1 : {
    id0 : [new Vec2D(6.14,3.93),
    new Vec2D(9.40,3.66)],
    id1 : [new Vec2D(1.84,1.84),
    new Vec2D(1.84,1.84)]
  },
  fair2 : {
    id0 : [new Vec2D(9.03,3.69),
new Vec2D(8.30,3.66),
new Vec2D(8.42,3.66),
new Vec2D(8.30,3.74),
new Vec2D(8.04,3.78),
new Vec2D(7.75,3.84),
new Vec2D(7.55,3.81),
new Vec2D(7.42,3.66),
new Vec2D(7.26,3.48),
new Vec2D(7.07,3.28),
new Vec2D(6.86,3.11),
new Vec2D(6.63,2.94),
new Vec2D(6.37,2.86),
new Vec2D(6.11,2.78)],
    id1 : [new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84),
new Vec2D(1.84,1.84)]
  },
  nair1 : {
    id0 : [new Vec2D(0.50,4.03),
    new Vec2D(0.50,4.03)],
    id1 : [new Vec2D(8.63,1.75),
    new Vec2D(7.83,1.89)]
  },
  nair2 : {
    id0 : [new Vec2D(0.50,4.03),
new Vec2D(0.50,4.03),
new Vec2D(0.49,4.03),
new Vec2D(0.49,4.03),
new Vec2D(0.48,4.03),
new Vec2D(0.48,4.04),
new Vec2D(0.47,4.04),
new Vec2D(0.47,4.04),
new Vec2D(0.46,4.04),
new Vec2D(0.46,4.04),
new Vec2D(0.45,4.04),
new Vec2D(0.45,4.04),
new Vec2D(0.44,4.04),
new Vec2D(0.44,4.04),
new Vec2D(0.44,4.04),
new Vec2D(0.44,4.04),
new Vec2D(0.44,4.04),
new Vec2D(0.45,4.04),
new Vec2D(0.45,4.04),
new Vec2D(0.46,4.04),
new Vec2D(0.47,4.04)],
    id1 : [new Vec2D(6.90,1.88),
new Vec2D(6.88,1.85),
new Vec2D(6.89,1.90),
new Vec2D(6.93,2.02),
new Vec2D(6.93,1.99),
new Vec2D(6.96,2.02),
new Vec2D(6.99,2.05),
new Vec2D(7.04,2.15),
new Vec2D(7.07,2.17),
new Vec2D(7.10,2.17),
new Vec2D(7.12,2.17),
new Vec2D(7.12,2.09),
new Vec2D(7.14,2.09),
new Vec2D(7.18,2.15),
new Vec2D(7.18,2.14),
new Vec2D(7.16,2.05),
new Vec2D(7.15,2.02),
new Vec2D(7.14,2.06),
new Vec2D(7.10,2.01),
new Vec2D(7.02,1.88),
new Vec2D(6.94,1.81)]
  },
  dair : {
    id0 : [new Vec2D(3.13,-2.20),
    new Vec2D(3.13,-2.20)],
    id1 : [new Vec2D(1.88,0),
    new Vec2D(1.88,0)],
    id2 : [new Vec2D(3.13,-2.20),
    new Vec2D(3.13,-2.20)],
    id3 : [new Vec2D(1.88,0),
    new Vec2D(1.88,0)]
  },
  bair : {
    id0 : [new Vec2D(-9.47,2.84),
    new Vec2D(-14.59,3.60),
  new Vec2D(-12.72,3.79),
new Vec2D(-9.58,3.51)],
    id1 : [new Vec2D(-6.29,3.09),
    new Vec2D(-8.01,3.59),
  new Vec2D(-7.08,3.69),
new Vec2D(-5.56,3.56)],
    id2 : [new Vec2D(-4.20,3.31),
    new Vec2D(-4.28,3.73),
  new Vec2D(-3.99,3.80),
new Vec2D(-3.47,3.74)]
  },
  upair : {
    id0 : [new Vec2D(-3.89,10.98),
    new Vec2D(0.21,13.08),
  new Vec2D(1.52,12.73),
new Vec2D(2.67,12.23)]
  },
  sidespecial : {
    id0 : [new Vec2D(3.68,4.77),
    new Vec2D(3.68,4.77),
  new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77),
new Vec2D(3.68,4.77)],
    id1 : [new Vec2D(14.32-2.02,1.92),
    new Vec2D(11.83-1.86,2.68),
  new Vec2D(10.92-3.58,3.57),
new Vec2D(9.07-1.58,3.31),
new Vec2D(9.73-1.45,2.85),
new Vec2D(10.96-2.78,2.95),
new Vec2D(12.19-4.01,3.00),
new Vec2D(9.32-1.13,3.09),
new Vec2D(9.25-1.04,3.21),
new Vec2D(9.19-0.96,3.33),
new Vec2D(10.08-1.83,3.44),
new Vec2D(9.08-0.81,3.59),
new Vec2D(9.86-1.55,3.73),
new Vec2D(10.54-2.24,3.83),
new Vec2D(11.16-2.87,3.91),
new Vec2D(8.89-0.58,4.03)]
  },
  fsmash1 : {
    id0 : [new Vec2D(4.88-1.45,6.16),
    new Vec2D(5.48-2.08,6.32),
  new Vec2D(3.98-0.62,6.44),
new Vec2D(4.55-1.22,6.54)],
    id1 : [new Vec2D(9.20-1.45,6.61),
    new Vec2D(9.92-2.08,6.69),
  new Vec2D(10.58-2.70,6.67),
new Vec2D(8.50-0.60,6.68)]
  },
  fsmash2 : {
    id0 : [new Vec2D(3.89-0.59,6.61),
new Vec2D(4.47-1.17,6.60),
new Vec2D(5.04-1.74,6.55),
new Vec2D(5.59-2.29,6.47),
new Vec2D(3.87-0.55,6.31)],
    id1 : [new Vec2D(9.08-1.19,6.72),
new Vec2D(9.63-1.77,6.60),
new Vec2D(10.15-2.34,6.52),
new Vec2D(8.30-0.56,6.48),
new Vec2D(8.78-1.10,6.29)]
  },
  dsmash : {
    id0 : [new Vec2D(-9.24,0.88),
    new Vec2D(-8.79,1.03)],
    id1 : [new Vec2D(9.51,0.69),
    new Vec2D(9.08,0.74)],
    id2 : [new Vec2D(-3.71,1.66),
    new Vec2D(-3.59,1.39)],
    id3 : [new Vec2D(3.97,1.46),
    new Vec2D(3.90,1.28)]
  },
  upsmash : {
    id0 : [new Vec2D(-5.95,10.98),
    new Vec2D(-0.33,14.92),
  new Vec2D(2.75,12.00),
new Vec2D(4.02,7.87)],
    id1 : [new Vec2D(-7.19,10.20),
    new Vec2D(-1.64,15.18),
  new Vec2D(1.87,12.54),
new Vec2D(3.58,9.02)]
  },
  jab1 : {
    id0 : [new Vec2D(4.56,4.85),
    new Vec2D(4.97,4.77)],
    id1 : [new Vec2D(8.10,4.80),
    new Vec2D(8.20,4.66)],
    id2 : [new Vec2D(11.64,4.75),
    new Vec2D(11.43,4.55)]
  },
  jab2 : {
    id0 : [new Vec2D(4.88,4.00),
    new Vec2D(5.00,3.90)],
    id1 : [new Vec2D(8.84,4.09),
    new Vec2D(8.56,3.94)],
    id2 : [new Vec2D(12.80,4.18),
    new Vec2D(12.13,3.98)]
  },
  dtilt : {
    id0 : [new Vec2D(13.60,3.31),
    new Vec2D(16.01,4.28),
  new Vec2D(15.76,4.49)],
    id1 : [new Vec2D(9.31,3.46),
    new Vec2D(10.72,4.21),
  new Vec2D(10.64,4.36)],
    id2 : [new Vec2D(5.73,3.67),
    new Vec2D(6.20,4.25),
  new Vec2D(6.25,4.34)]
  },
  uptilt1 : {
    id0 : [new Vec2D(-1.40,2.87),
    new Vec2D(-4.40,6.63)],
    id1 : [new Vec2D(-0.32,0.53),
    new Vec2D(-7.45,9.39)]
  },
  uptilt2 : {
    id0 : [new Vec2D(-2.22,10.56),
new Vec2D(-1.44,11.15),
new Vec2D(-1.11,11.32),
new Vec2D(-1.31,11.21),
new Vec2D(-1.69,10.95)],
    id1 : [new Vec2D(-0.61,15.97),
new Vec2D(1.07,16.19),
new Vec2D(1.84,16.13),
new Vec2D(1.53,16.00),
new Vec2D(0.89,15.79)]
  },
  ftilt : {
    id0 : [new Vec2D(3.19,3.01),
    new Vec2D(5.79,4.39),
  new Vec2D(5.13,4.62),
new Vec2D(3.34,4.70)],
    id1 : [new Vec2D(7.60,3.46),
    new Vec2D(11.12,4.57),
  new Vec2D(9.89,4.64),
new Vec2D(6.52,4.68)]
  },
  dashattack1 : {
    id0 : [new Vec2D(7.07-2.44,8.73),
    new Vec2D(9.25-4.35,8.49),
  new Vec2D(10.63-5.75,8.47),
new Vec2D(11.97-7.11,8.47),
new Vec2D(13.29-8.44,8.46)]
  },
  dashattack2 : {
    id0:[new Vec2D(6.14-1.30,8.46),
new Vec2D(7.42-2.58,8.43),
new Vec2D(8.67-3.82,8.38),
new Vec2D(6.08-1.22,8.30),
new Vec2D(7.28-2.42,8.17),
new Vec2D(6.04-1.17,7.99)]
  },
  downspecial : {
    id0 : [new Vec2D(0.13,5.26)]
  },
  upspecial : {
    id0 : [new Vec2D(0,5.3)]
  },
  /*upspecial1 : {
    id0 : [new Vec2D(-0.76,4.94),
    new Vec2D(-0.92,5.06),
  new Vec2D(-1.08,5.18),
new Vec2D(-1.25,5.29),
new Vec2D(-1.41,5.41),
new Vec2D(-1.58,5.52),
new Vec2D(-1.74,5.63),
new Vec2D(-1.90,5.74)]
  },
  upspecial2 : {
    id0 : [new Vec2D(1.22,4.91),
    new Vec2D(1.33,5.06),
  new Vec2D(1.44,5.20),
new Vec2D(1.56,5.35),
new Vec2D(1.67,5.50),
new Vec2D(1.77,5.64),
new Vec2D(1.88,5.78),
new Vec2D(1.99,5.90)]
  },
  upspecial3 : {
    id0 : [new Vec2D(-0.10,4.25),
    new Vec2D(-0.15,4.35),
  new Vec2D(-0.19,4.46),
new Vec2D(-0.23,4.60),
new Vec2D(-0.27,4.74),
new Vec2D(-0.30,4.90),
new Vec2D(-0.33,5.06),
new Vec2D(-0.36,5.23),
new Vec2D(-0.39,5.39),
new Vec2D(-0.41,5.56),
new Vec2D(-0.43,5.71),
new Vec2D(-0.45,5.86),
new Vec2D(-0.46,5.99)]
  },*/
  grab : {
    id0 : [new Vec2D(10.28,4.77),
    new Vec2D(10.28,4.77)],
    id1 : [new Vec2D(4.77,4.77),
    new Vec2D(4.77,4.77)]
  },
  downattack1 : {
    id0 : [new Vec2D(-12.01,2.37),
    new Vec2D(-14.19,2.83)],
    id1 : [new Vec2D(-5.72,3.29),
    new Vec2D(-6.78,4.03)],
    id2 : [new Vec2D(-1.74,1.75),
    new Vec2D(-1.87,2.05)],
    id3 : [new Vec2D(-2.12,5.46),
    new Vec2D(-2.82,6.01)]
  },
  downattack2 : {
    id0 : [new Vec2D(13.03,3.30),
    new Vec2D(14.14,2.60)],
    id1 : [new Vec2D(6.22,4.52),
    new Vec2D(6.79,4.06)],
    id2 : [new Vec2D(2.69,2.08),
    new Vec2D(1.94,1.96)],
    id3 : [new Vec2D(2.68,6.15),
    new Vec2D(2.82,6.01)]
  },
  pummel : {
    id0 : [new Vec2D(11.75,5.51),
    new Vec2D(11.75,5.51)]
  },
  downspecial : {
    id0 : [new Vec2D(0.13,5.26)]
  },
  ledgegetupquick : {
    id0 : [new Vec2D(2.43-4.90,12.50),
    new Vec2D(5.14-5.78,12.50),
    new Vec2D(7.92-6.37,11.52),
  new Vec2D(10.85-6.59,7.79),
new Vec2D(10.79-6.41,5.19)],
    id1 : [new Vec2D(-5.23-1.10,13.25),
    new Vec2D(-2.16-1.99,14.24),
  new Vec2D(1.32-2.58,15.56),
new Vec2D(10.49-2.79,12.57),
new Vec2D(12.69-2.61,6.71)]
  },
  ledgegetupslow : {
    id0 : [new Vec2D(-5.01-2.03,1.55),
    new Vec2D(-4.24-3.12,1.24),
  new Vec2D(1.98-4.14,1.09),
new Vec2D(11.82-4.99,0.88),
new Vec2D(13.03-5.57,0.73),
new Vec2D(-0.23-5.79,0.39),
new Vec2D(-2.47-5.72,0.34),
new Vec2D(7.68-5.53,0.45),
new Vec2D(14.17-5.22,0.61),
new Vec2D(13.51-4.82,0.80),
new Vec2D(7.98-4.35,0.98),
new Vec2D(1.51-3.83,1.07),
new Vec2D(-3.20-3.26,1.10),
new Vec2D(-5.69-2.67,1.10),
new Vec2D(-6.50-2.08,1.08),
new Vec2D(-6.37-1.50,1.05),
new Vec2D(-5.90-0.96,0.99)],
    id1 : [new Vec2D(9.32-2.03,1.31),
    new Vec2D(8.20-3.12,1.28),
  new Vec2D(4.70-4.14,0.63),
new Vec2D(0.04-4.99,0.98),
new Vec2D(-2.99-5.57,1.15),
new Vec2D(10.66-5.79,0.44),
new Vec2D(14.68-5.72,0.17),
new Vec2D(4.89-5.53,0.19),
new Vec2D(-2.99-5.22,0.39),
new Vec2D(-4.44-4.82,0.64),
new Vec2D(-0.88-4.35,0.89),
new Vec2D(4.14-3.83,1.02),
new Vec2D(8.09-3.26,1.05),
new Vec2D(10.01-2.67,1.04),
new Vec2D(10.26-2.08,1.02),
new Vec2D(9.45-1.50,0.99),
new Vec2D(8.18-0.96,0.97)]
  },
  thrown : {
    id0 : [new Vec2D(0,12)]
  },
  throwdownextra : {
    id0 : [new Vec2D(2.94,3.67)]
  },
  throwforwardextra : {
    id0 : [new Vec2D(1.41,7.43)]
  },
  neutralspecialair : {
    id0 : [new Vec2D(0,5.14)]
  },
  neutralspecialground : {
    id0 : [new Vec2D(0,5.14)],
    id1 : [new Vec2D(-3.67,5.14)],
    id2 : [new Vec2D(3.67,5.14)]
  }
}

hitboxes[1] = {
  fair1 : new hitboxObject(new hitbox(offsets[1].fair1.id0,3.515,12,361,100,10,0,0,0,1,1),new hitbox(offsets[1].fair1.id1,4.687,10,361,100,10,0,0,0,1,1)),
  fair2 : new hitboxObject(new hitbox(offsets[1].fair2.id0,3.515,7,361,80,10,0,0,0,1,1),new hitbox(offsets[1].fair2.id1,4.687,7,361,80,10,0,0,0,1,1)),
  bair : new hitboxObject(new hitbox(offsets[1].bair.id0,3.906,12,361,100,10,0,0,0,1,1),new hitbox(offsets[1].bair.id1,3.906,12,361,100,10,0,0,0,1,1),new hitbox(offsets[1].bair.id2,4.297,12,361,100,10,0,0,0,1,1)),
  nair1 : new hitboxObject(new hitbox(offsets[1].nair1.id0,5.078,12,361,70,10,0,0,0,1,1),new hitbox(offsets[1].nair1.id1,3.906,12,361,70,10,0,0,0,1,1)),
  nair2 : new hitboxObject(new hitbox(offsets[1].nair2.id0,4.687,9,361,80,10,0,0,0,1,1),new hitbox(offsets[1].nair2.id1,3.515,9,361,80,10,0,0,0,1,1)),
  dair : new hitboxObject(new hitbox(offsets[1].dair.id0,5.078,2,270,100,20,0,0,0,1,0),new hitbox(offsets[1].dair.id1,4.297,2,270,100,20,0,0,0,1,0),new hitbox(offsets[1].dair.id2,5.078,2,30,100,10,0,0,0,0,1),new hitbox(offsets[1].dair.id3,4.297,2,30,100,10,0,0,0,0,1)),
  upair : new hitboxObject(new hitbox(offsets[1].upair.id0,5.468,12,90,100,30,0,0,0,1,1)),
  upb : new hitboxObject(new hitbox(offsets[1].upspecial.id0,10.937,0,361,100,0,0,5,0,1,0)),
  /*upb1 : new hitboxObject(new hitbox(offsets[1].upspecial1.id0,10.937,0,361,100,0,0,5,0,1,0)),
  upb2 : new hitboxObject(new hitbox(offsets[1].upspecial2.id0,10.937,0,361,100,0,0,5,0,1,0)),
  upb3 : new hitboxObject(new hitbox(offsets[1].upspecial3.id0,12.890,0,361,100,0,0,5,0,1,0)),*/
  dtilt : new hitboxObject(new hitbox(offsets[1].dtilt.id0,3.515,10,20,30,40,0,0,1,1,1),new hitbox(offsets[1].dtilt.id1,3.515,10,20,30,40,0,0,1,1,1),new hitbox(offsets[1].dtilt.id2,3.906,10,20,30,40,0,0,1,1,1)),
  uptilt1 : new hitboxObject(new hitbox(offsets[1].uptilt1.id0,3.125,9,96,120,40,0,0,1,1,1),new hitbox(offsets[1].uptilt1.id1,4.297,9,96,120,40,0,0,1,1,1)),
  uptilt2 : new hitboxObject(new hitbox(offsets[1].uptilt2.id0,3.125,8,88,120,40,0,0,1,1,1),new hitbox(offsets[1].uptilt2.id1,3.515,8,88,120,40,0,0,1,1,1)),
  ftilt : new hitboxObject(new hitbox(offsets[1].ftilt.id0,2.734,10,361,100,8,0,0,1,1,1),new hitbox(offsets[1].ftilt.id1,3.125,10,361,100,8,0,0,1,1,1)),
  dashattack1 : new hitboxObject(new hitbox(offsets[1].dashattack1.id0,4.687,12,361,100,16,0,0,1,1,1)),
  dashattack2 : new hitboxObject(new hitbox(offsets[1].dashattack2.id0,4.687,8,361,100,8,0,0,1,1,1)),
  jab1 : new hitboxObject(new hitbox(offsets[1].jab1.id0,3.515,3,361,50,8,0,0,1,1,1),new hitbox(offsets[1].jab1.id1,3.515,3,361,50,8,0,0,1,1,1),new hitbox(offsets[1].jab1.id2,3.515,3,361,50,8,0,0,1,1,1)),
  jab2 : new hitboxObject(new hitbox(offsets[1].jab2.id0,3.515,3,361,50,16,0,0,1,1,1),new hitbox(offsets[1].jab2.id1,3.515,3,361,50,16,0,0,1,1,1),new hitbox(offsets[1].jab2.id2,3.515,3,361,50,16,0,0,1,1,1)),
  sidespecial : new hitboxObject(new hitbox(offsets[1].sidespecial.id0,3.515,13,90,75,52,0,0,0,1,1),new hitbox(offsets[1].sidespecial.id1,3.515,13,120,75,52,0,0,0,1,1)),
  fsmash1 : new hitboxObject(new hitbox(offsets[1].fsmash1.id0,4.297,17,361,118,10,0,0,1,1,1),new hitbox(offsets[1].fsmash1.id1,4.297,17,361,118,10,0,0,1,1,1)),
  fsmash2 : new hitboxObject(new hitbox(offsets[1].fsmash2.id0,3.515,13,361,105,6,0,0,1,1,1),new hitbox(offsets[1].fsmash2.id1,3.515,13,361,105,6,0,0,1,1,1)),
  upsmash : new hitboxObject(new hitbox(offsets[1].upsmash.id0,5.859,14,90,110,20,0,0,1,1,1),new hitbox(offsets[1].upsmash.id1,3.906,14,90,110,20,0,0,1,1,1)),
  dsmash : new hitboxObject(new hitbox(offsets[1].dsmash.id0,3.906,12,0,66,34,0,0,1,1,1),new hitbox(offsets[1].dsmash.id1,3.906,12,0,66,34,0,0,1,1,1),new hitbox(offsets[1].dsmash.id2,4.687,12,0,66,34,0,0,1,1,1),new hitbox(offsets[1].dsmash.id3,4.687,12,0,66,34,0,0,1,1,1)),
  grab : new hitboxObject(new hitbox(offsets[1].grab.id0,3.906,0,361,100,0,0,2,3,1,1),new hitbox(offsets[1].grab.id1,3.125,0,361,100,0,0,2,3,1,1)),
  downattack1 : new hitboxObject(new hitbox(offsets[1].downattack1.id0,4.687,8,361,50,80,0,0,1,1,1),new hitbox(offsets[1].downattack1.id1,2.344,6,361,50,80,0,0,1,1,1),new hitbox(offsets[1].downattack1.id2,2.344,6,361,50,80,0,0,1,1,1),new hitbox(offsets[1].downattack1.id3,2.344,6,361,50,80,0,0,1,1,1)),
  downattack2 : new hitboxObject(new hitbox(offsets[1].downattack2.id0,4.687,8,361,50,80,0,0,1,1,1),new hitbox(offsets[1].downattack2.id1,2.344,6,361,50,80,0,0,1,1,1),new hitbox(offsets[1].downattack2.id2,2.344,6,361,50,80,0,0,1,1,1),new hitbox(offsets[1].downattack2.id3,2.344,6,361,50,80,0,0,1,1,1)),
  downspecial : new hitboxObject(new hitbox(offsets[1].downspecial.id0,1.953,28,361,120,78,0,3,0,1,1)),
  ledgegetupquick : new hitboxObject(new hitbox(offsets[1].ledgegetupquick.id0,3.906,6,361,100,0,90,0,1,1,1),new hitbox(offsets[1].ledgegetupquick.id1,4.687,6,361,100,0,90,0,1,1,1)),
  ledgegetupslow : new hitboxObject(new hitbox(offsets[1].ledgegetupslow.id0,5.859,6,361,100,0,90,0,1,1,1),new hitbox(offsets[1].ledgegetupslow.id1,5.859,6,361,100,0,90,0,1,1,1)),
  neutralspecialground : new hitboxObject(new hitbox(offsets[1].neutralspecialground.id0,1.953,10,20,120,30,0,0,0,1,1),new hitbox(offsets[1].neutralspecialground.id1,2.734,10,20,120,30,0,0,0,1,1),new hitbox(offsets[1].neutralspecialground.id2,2.734,10,20,120,30,0,0,0,1,1)),
  neutralspecialair : new hitboxObject(new hitbox(offsets[1].neutralspecialair.id0,1.953,10,90,102,30,0,0,0,1,1)),
  pummel : new hitboxObject(new hitbox(offsets[1].pummel.id0,4.687,3,361,100,0,30,0,0,1,1)),
  throwup : new hitboxObject(new hitbox(new Vec2D(-4.44533,0.66545),0,11,90,25,130,0,0,0,1,1)),
  throwdown : new hitboxObject(new hitbox(new Vec2D(0.56941,0),0,2,80,45,100,0,0,0,1,1)),
  throwdownextra : new hitboxObject(new hitbox(offsets[1].throwdownextra.id0,3.515,1,361,100,0,30,0,0,1,1)),
  throwback : new hitboxObject(new hitbox(new Vec2D(-14.20273+7.52,0),0,10,135,25,90,0,0,0,1,1)),
  throwforward : new hitboxObject(new hitbox(new Vec2D(10.8537,0.01),0,5,55,30,100,0,0,0,1,1)),
  throwforwardextra : new hitboxObject(new hitbox(offsets[1].throwforwardextra.id0,8.593,7,361,110,40,0,0,0,1,1)),
  thrown : new hitboxObject(new hitbox(offsets[1].thrown.id0,3.906,4,361,50,20,0,1,0,1,1))
}

for (var l=0;l<20;l++){
  offsets[1].thrown.id0.push(new Vec2D(0,12));
}

chars[1] = new charObject(1);
