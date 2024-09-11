//preload images
let firstRun = true;

//image variables
let eyeAng;
let eyeNorm;
let mouthClos;
let mouthOpe;
let static;

//timing variables
let countMax = 20456; //end of song
let firstBeat = 149; //first beat of song

let chor1 = [812, 2545];
let chor2 = [5290, 7004];
let chor3 = [9747, 15000];

let crash = [65, 84, 106, 127]; 

let timer = 0;
let beat = 0;

//other
let faceSize = 800;
let faceOffset = 30;

let barWidth = 15;
let barSpace = barWidth + 5;

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
  
  if (firstRun) {
    eyeAng = loadImage("images/eyeAng.png");
    eyeNorm = loadImage("images/eyeNorm.png");
    mouthClos = loadImage("images/mouthClos.png");
    mouthOpe = loadImage("images/mouthOpe.png");
    static = loadImage('images/static');

    firstRun = false;
  }

  let othVol = 70;
  let basVol = 63;

  //center everything so I can build around (0, 0).  
  push();
  translate(width/2, height/2);

  //plays intro sequence then main song
  let oop = 60
  let screenSize = 1;
  // rect(0, 0, 96 * screenSize, 54 * screenSize);

    //screenSize ++;

  if (oop <= crash[0]) {
   


    //box back
    fill(100);
    rect(0, -30, 130, 80)
    triangle(-65, -70, -96, -54, 0, 0);
    triangle(65, -70, 96, -54, 0, 0);

    //screen
    fill(120);
    rect(0, 0, 96 * 2, 54 * 2);
    fill(100);
    rect(0, 0, 96 * 2 - 15, 54 * 2 - 15);

    image(static, 0, 0, 96 * 2 - 20, 54 * 2 - 20)
  } else if (oop <= crash[1]) {

  } else if (oop <= crash[2]) {

  } else {
    background(40);

    //flashes red to bass
    if (bass >= basVol) {
    background(100, 0, 0);
     } 
    // else if (other >= othVol) {
    //   background(0, 0, 100);
    // }

    //set sound waves during chorus, face during verse
    if (counter <= chor1[1] || counter >= chor2[0] && counter <= chor2[1] || counter >= chor3[0]) {
      graph(vocal, 0, 1, 340);
      graph(drum, drum, 1.5, 160);
      graph(other, drum, 2.5, -320);
    } else if (counter > chor1[1] && counter < chor2[0] || counter > chor2[1] && counter < chor3[0]) {
      verse(words, vocal, drum, bass, other, counter);
    }
    
    frame();

    if (bass >= basVol) {
      fill(200, 0, 0, 40);
      rect(width/2, height/2, width, height);
    } 
    // else if (other >= othVol) {
    //   fill(0, 0, 200, 40);
    //   rect(width/2, height/2, width, height);
    // }
  
    overlay(counter);
  }
 
  pop();


  
}

function graph(wave, move, resize, displace){
  let barMove;
  if (move == 0) {
    barMove = 0;
  } else {
    barMove = map(move, 0, 100, -5, 5);
  }
  
  push();
  translate(int(barMove) * barSpace + displace, 0);
  soundwave(wave, resize);
  pop();
}

function verse(words, vocal, drum, bass, other, counter){
  push();
  scale(0.9); //fit face in screen while spinning
  //rotate(counter);

  bob = map(bass, 0, 100, -30, 30);
  translate(0, bob);
  imagetry(words, drum, bass, other, counter);
  pop();
}

function overlay(counter) {
  dead = map(counter, crash[3], 12053, 0, 40);
  fill(255, 50, 50, dead);
  rect(width/2, height/2, width, height);
}

function frame() {
  let frameThicc = 80;
  let frameShad = frameThicc + 20;
  let frameCol;
  let frameEdge;

  for (let i = 0; i < 2; i ++) {
    if (i == 0){
      frameCol = 100;
      frameEdge = frameShad;
    } else if (i == 1) {
      frameCol = 120;
      frameEdge = frameThicc;
    }
    fill(frameCol);
    rect(0, -height/2, width, frameEdge); //top
    rect(0, height/2, width, frameEdge); //bot
    rect(-width/2, 0, frameEdge, height); //left
    rect(width/2, 0, frameEdge, height); //right
  }
}

function imagetry(words, drum, bass, other, counter) {
  let eyeType; 
  let mouthType;

  //mouth stuff, opend mouth when words are said
  if (words == ""){
    mouthType = mouthClos;
  } else {
    mouthType = mouthOpe;
  }
  
  //makes eyes normal and closes mouth when chorus plays since words dont sync
  if (counter <= chor1[1] || counter >= chor2[0] && counter <= chor2[1] || counter >= chor3[0]) {
    eyeType = eyeNorm;
    mouthType = mouthClos;
  } else {
    eyeType = eyeAng;
  }
  image(mouthType, 0, faceOffset, faceSize, faceSize);

  //eye stuff
  let dcolour = map(drum, 50, 100, 0, 255);

  fill(255, dcolour, 0); //changes pupil colour based off drum

  rect(-110, faceOffset - 120, 45, 50); //left pupil
  rect(110, faceOffset - 120, 45, 50); //right pupil

  image(eyeType, 0, 30, faceSize, faceSize); //left eye
  push();
  scale(-1, 1);
  image(eyeType, 0, 30, faceSize, faceSize); //right eye
  pop();
}

function soundwave(instrument, resize){
  
  let barSlope;
  let barMap = map(instrument, 0, 100, 2, 250);

  fill(255);
  //draws sound bars across the entire canvas, makes bars smaller the further away from the middle bar they are
  for (let i = -width; i <= width; i ++){
    if (i < 0) {
      barSlope = -i;
    } else if (i == 0){
      barSlope = 0.5;
    } else {
      barSlope = i;
    }
    rect(barSpace * i, 0, barWidth, barMap/barSlope/resize);
  }
}
  // textFont('Brush Script MT'); // please use CSS safe fonts
  // textSize(24);