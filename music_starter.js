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
  
  // if (songIsPlaying) {
  //   timer ++;
  // } else {
  //   timer = 0;
  // }

  // if (timer == firstBeat + beat) {
  //   background(100, 0, 0);
  //   beat += 43;
  // }

  let othVol = 70;
  let basVol = 63;

  if (bass >= basVol) {
    background(100, 0, 0);
  } else if (other >= othVol) {
    background(0, 0, 100);
  }

  // if (counter == firstBeat){
  //   background(100, 0, 0);
  // } else if (counter >= 325) {
  //   background(0, 100, 0);
  // }

  push();
  translate(width/2, height/2); //center face
  
  soundwave(vocal);

  scale(0.8); //fit face in screen while spinning
  //rotate(counter);

  bob = map(bass, 0, 100, -20, 20);
  translate(0, bob);
  //imagetry(words, vocal, drum, bass, other, counter);
  pop();

  frame();

  if (bass >= basVol) {
    fill(200, 0, 0, 40);
    rect(width/2, height/2, width, height);
  } else if (other >= othVol) {
    fill(0, 0, 200, 40);
    rect(width/2, height/2, width, height);
  }

  overlay(counter);
}

function overlay(counter) {
  dead = map(counter, 0, 12053, 0, 40);
  fill(255, 50, 50, dead);
  rect(width/2, height/2, width, height);
}

function frame() {
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

function soundwave(instrument){
  let barWidth = 15;
  let barSpace = barWidth + 5;
  let barSlope;
  let barMap = map(instrument, 0, 100, 2, 100);

  fill(255);
  
  let iSpace = 2;
  for (let i = -iSpace; i <= iSpace; i + barSpace){
    if (i < 0) {
      barSlope = -i;
    } else {
      barSlope = i;
    }
    rect(barSpace * i, 0, barWidth, barMap / barSlope);
  }
}
  // textFont('Verdana'); // please use CSS safe fonts
  // textSize(24);