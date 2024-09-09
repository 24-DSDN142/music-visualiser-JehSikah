//preload images
let firstRun = true;

//image variables
let eyeAng;
let eyeNorm;
let mouthClos;
let mouthOpe;

//timing variables
let countMax = 20456; //end of song
let firstBeat = 149; //first beat of song

let chor1 = [812, 2545];
let chor2 = [5290, 7004];
let chor3 = [9747, 15]

let crash = [65, 84, 106, 127]; 

let timer = 0;
let beat = 0;

//other
let faceSize = 800;
let faceOffset = 30;

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
  
  if (firstRun) {
    eyeAng = loadImage("images/eyeAng.png")
    eyeNorm = loadImage("images/eyeNorm.png")
    mouthClos = loadImage("images/mouthClos.png")
    mouthOpe = loadImage("images/mouthOpe.png")

    firstRun = false;
  }

  background(50);
  
  if (songIsPlaying) {
    timer ++;
  } else {
    timer = 0;
  }

  // if (timer == firstBeat + beat) {
  //   background(100, 0, 0);
  //   beat += 43;
  // }

  if (bass >= 70) {
    background(100, 0, 0);
  }

  // if (counter == firstBeat){
  //   background(100, 0, 0);
  // } else if (counter >= 325) {
  //   background(0, 100, 0);
  // }

  //console.log(timer);

  // push();
  // translate(canvasWidth/2, canvasHeight/2);
  // let lurk = counter/9500 + 0.01;
  // // scale(lurk);
  // nightmarepix(vocal, drum, bass, other);
  // grid2();
  // pop();

  push();
  translate(width/2, height/2); //center face
  
  //musicbar(vocal, drum, bass, other);
  vocaliser(vocal);

  scale(0.8); //fit face in screen while spinning
  //rotate(counter);

  bob = map(bass, 0, 100, -20, 20);
  translate(0, bob);

  //imagetry(words, vocal, drum, bass, other, counter);
  pop();

  frame2();

  overlay(counter);

  fill(0);
  text(beat+firstBeat, 30, 30);

}

function overlay(counter) {
  dead = map(counter, 0, 12053, 0, 40);
  fill(255, 50, 50, dead);
  rect(width/2, height/2, width, height);
}

function frame() {
  let frameThicc = 80;
  let frameShad = frameThicc + 20;
  let frameBot = 60;


  //frame inset
  fill(100);
  rect(width/2, 0, width, frameShad); //top
  rect(width/2, height, width, frameShad + frameBot); //bot
  rect(0, height/2, frameShad, height); //left
  rect(width, height/2, frameShad, height); //right

  //outer frame
  fill(120);
  rect(width/2, 0, width, frameThicc); //top
  rect(width/2, height, width, frameThicc + frameBot); //bot
  rect(0, height/2, frameThicc, height); //left
  rect(width, height/2, frameThicc, height); //right
}

function frame2() {
  let frameThicc = 80;
  let frameShad = frameThicc + 20;
  let frameBot = 0;


  //frame inset
  fill(100);
  rect(width/2, 0, width, frameShad); //top
  rect(width/2, height, width, frameShad + frameBot); //bot
  rect(0, height/2, frameShad, height); //left
  rect(width, height/2, frameShad, height); //right

  //outer frame
  fill(120);
  rect(width/2, 0, width, frameThicc); //top
  rect(width/2, height, width, frameThicc + frameBot); //bot
  rect(0, height/2, frameThicc, height); //left
  rect(width, height/2, frameThicc, height); //right
}

function grid() {
  let gridSpace = 20; //12, 20
  stroke(20);
  strokeWeight(2);

  for (let lineX = 0; lineX <= canvasWidth; lineX += gridSpace) {
    line(lineX, 0, lineX, canvasHeight);
  }

  for (let lineY = 0; lineY <= canvasHeight; lineY += gridSpace) {
    line(0, lineY, canvasWidth, lineY);
  }
}

function grid2() {
  let gridSpace = 20; //12, 20
  stroke(20);
  strokeWeight(2);

  for (let lineX = -canvasWidth; lineX <= 2*canvasWidth; lineX += gridSpace) {
    line(lineX, -canvasHeight, lineX, canvasHeight);
  }

  for (let lineY = -canvasHeight; lineY <= 2*canvasHeight; lineY += gridSpace) {
    line(-canvasWidth, lineY, canvasWidth, lineY);
  }
}

function nightmare(vocal, drum, bass, other) {
  let eyeS = 150;
  let eyeL = -100;
  let eyeW = 200;
  let eyeH = 100;
  let mouthup = 10;

  noStroke();

  //eye whites
  fill(255);
  ellipse(-eyeS, eyeL, eyeW, eyeH);
  ellipse(eyeS, eyeL, eyeW, eyeH);

  //iris
  let dcolour = map(drum, 0, 100, 100, 255);
  let bcolour = map(bass, 0, 100, 100, 255);
  let ocolour = map(other, 0, 100, 100, 255);
  fill(dcolour, bcolour, ocolour);
  ellipse(-eyeS, eyeL, 100, 100);
  ellipse(eyeS, eyeL, 100, 100);

  //nostrils
  // fill(255);
  // ellipse(-15, 0, 7, 20); //left
  // ellipse(15, 0, 7, 20); //right

  //inner mouth
  fill(255);
  arc(0, mouthup, 500, 200, 0, 180);

  //teeth
  stroke(20);
  strokeWeight(4);
  for (let i = -4; i < 5; i++){
    line(50*i, mouthup, 50*i, mouthup + 100);
  }

  //moving mouth
  noStroke();
  let talk = map(vocal, 0, 100, 190, 0);
  fill(20);
  arc(0, mouthup - 2, 502, talk, 0, 180);
}

function nightmarepix(vocal, drum, bass, other) {
  let eyeHeight = -90;
  let eyeSpace = 130;

  fill(200, 160, 100);
  //left eye
  rect(-eyeSpace, eyeHeight, 100, 100);
  rect(-eyeSpace, eyeHeight, 140, 60);
  rect(-eyeSpace, eyeHeight, 180, 20);
  
  //right eye
  rect(eyeSpace, eyeHeight, 100, 100);
  rect(eyeSpace, eyeHeight, 140, 60);
  rect(eyeSpace, eyeHeight, 180, 20);

  fill(20);
  rect(-eyeSpace, eyeHeight, 20, 80);
  rect(eyeSpace, eyeHeight, 20, 80);

  //mouth
  fill(200, 160, 100);
  rect(0, 80, 280, 80);
  rect(0, 60, 400, 40)
  rect(-200, 30, 80, 20);
  rect(200, 30, 80, 20);

  fill(20);
  rect(0, )

}

function imagetry(words, vocal, drum, bass, other, counter) {
  let eyeType = eyeNorm; //change between norm and ang
  let mouthType = mouthClos;

  if (words == ""){
    mouthType = mouthClos;
    faceOffset = 30;
  } else {
    mouthType = mouthOpe;
    faceOffset = 10;
  }
  
  // if (counter >= chor1[0] && counter <= chor1[1]) {
  //   eyeType = eyeNorm;
  //   mouthType = mouthClos;

  // } else if (counter >= chor2[0] && counter <= chor2[1]) {
  //   eyeType = eyeNorm;
  //   mouthType = mouthClos;

  // } else if (counter >= chor3[0] && counter <= chor3[1]) {
  //   eyeType = eyeNorm;
  //   mouthType = mouthClos;

  // } else {
  //   eyeType = eyeAng;
  // }

  if (counter <= chor1[1] || counter >= chor2[0] && counter <= chor2[1] || counter >= chor3[0]) {
    eyeType = eyeNorm;
    mouthType = mouthClos;
    faceOffset = 10;
  } else {
    eyeType = eyeAng;
  }

  image(mouthType, 0, faceOffset, faceSize, faceSize);

  //eye stuff
  let dcolour = map(drum, 0, 100, 100, 255);
  let bcolour = map(bass, 0, 100, 100, 255);
  let ocolour = map(other, 0, 100, 100, 255);

  let dcolour2 = map(drum, 50, 100, 0, 255);

  // fill(dcolour, bcolour, ocolour);
  fill(255, dcolour2, 0);

  rect(-110, faceOffset - 120, 45, 50); //left pupil
  rect(110, faceOffset - 120, 45, 50); //left pupil

  image(eyeType, 0, faceOffset, faceSize, faceSize); //left eye
  push();
  scale(-1, 1);
  image(eyeType, 0, faceOffset, faceSize, faceSize); //right eye
  pop();

}

function musicbar(vocal, drum, bass, other){
  let barWidth = 175;

  fill(100);

  let vmap = map(vocal, 0, 100, 10, 800);
  let dmap = map(drum, 0, 100, 10, 800);
  let bmap = map(bass, 0, 100, 10, 800);
  let omap = map(other, 0, 100, 10, 800);

  fill(160, 40, 220);
  rect(-300, 200, barWidth, vmap);

  fill(220, 40, 40);
  rect(-100, 200, barWidth, dmap);

  fill(40, 220, 200);
  rect(100, 200, barWidth, bmap);

  fill(220, 130, 40);
  rect(300, 200, barWidth, omap);

}

function vocaliser(vocal){
  let barWidth = 15;
  let barSpace = 7;
  let barDiv = 25;
  let barVar;

  let barMap = map(vocal, 0, 100, 2, 100);

  fill(255);
  //right side of sound wave thing
  for (let bar = 0; bar <= width; bar += barSpace) {
    barVar = bar/barDiv;

    rect(3*bar, 0, barWidth, barMap / barVar);
  }

  //middle bar cause 0/something doesn't make anything
  rect(0, 0, barWidth, barMap * 5);

  //left side of sound wave thing
  for (let bar = 0; bar >= -width; bar -= barSpace) {
    barVar = -bar/barDiv;

    rect(3*bar, 0, barWidth, barMap / barVar);
  }
}


  // textFont('Verdana'); // please use CSS safe fonts
  // textSize(24);