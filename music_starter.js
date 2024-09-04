
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20);
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER);
  textSize(24);

  push();
  translate(canvasWidth/2, canvasHeight/2);
  let lurk = counter/9500 + 0.01;
  // scale(lurk);
  nightmarepix(vocal, drum, bass, other);
  grid2();
  pop();

  frame();
}

function frame() {
  let frameThicc = 80;
  let frameShad = frameThicc + 20;
  let frameBot = 60;
  noStroke();

  //frame inset
  fill(100);
  rect(canvasWidth/2, 0, canvasWidth, frameShad); //top
  rect(canvasWidth/2, canvasHeight, canvasWidth, frameShad + frameBot); //bot
  rect(0, canvasHeight/2, frameShad, canvasHeight); //left
  rect(canvasWidth, canvasHeight/2, frameShad, canvasHeight); //right

  //outer frame
  fill(120);
  rect(canvasWidth/2, 0, canvasWidth, frameThicc); //top
  rect(canvasWidth/2, canvasHeight, canvasWidth, frameThicc + frameBot); //bot
  rect(0, canvasHeight/2, frameThicc, canvasHeight); //left
  rect(canvasWidth, canvasHeight/2, frameThicc, canvasHeight); //right

  fill(200, 160, 100);
  ellipse(canvasWidth - 30, canvasHeight - 30, 30, 30);
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