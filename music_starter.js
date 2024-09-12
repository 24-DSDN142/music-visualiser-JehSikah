//preload images
let firstRun = true;

//image variables
let eyeAng;
let eyeNorm;
let mouthClos;
let mouthOpe;
let static;
let vignette;

//timing variables
let countMax = 20458; //end of song

let chor1 = [812, 2545];
let chor2 = [5250, 7004];
let chor3 = [9747, 14000]; //13725ish 13580
let crash = [65, 84, 106, 127]; //intro crash cymbal times

//other
let barWidth = 15;
let barSpace = barWidth + 5;

let basVol = 63;

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  noStroke();
  
  if (firstRun) {
    eyeAng = loadImage("images/eyeAng.png");
    eyeNorm = loadImage("images/eyeNorm.png");
    mouthClos = loadImage("images/mouthClos.png");
    mouthOpe = loadImage("images/mouthOpe.png");
    vignette = loadImage("images/vignette.png");
    static = loadImage("images/static.gif");

    firstRun = false;
  }

  //center everything so I can build around (0, 0).  
  let frameMap = map (bass, 0, 100, 1, 1.05);
  push();
  translate(width/2, height/2);
  scale(frameMap);

  //plays intro sequence then main song
  if (counter <= crash[0]) {
    introscene();
    makevignette();
  } else if (counter <= crash[1]) {
    push();
    scale(1.5);
    introscene();
    pop();
    makevignette();
  } else if (counter <= crash[2]) {
    push();
    scale(2);
    introscene();
    pop();
    makevignette();
  } else if (counter <= crash[3]) {
    push();
    scale(3.5);
    introscene();
    pop();
    makevignette();
  } else {
    background(20);

    //flashes red to bass
    if (bass >= basVol && counter > chor1[1]) {
    background(100, 0, 0);
     } 

    //set sound waves during chorus, face during verse
    if (counter <= chor1[1] || counter >= chor2[0] && counter <= chor2[1] || counter >= chor3[0]) {
      let soundMap = map(vocal, 0, 100, -30, 20);
      let scaleMap = map(vocal, 0, 100, 0.6, 1.4);
      if (counter <= chor1[1]) {
        graph(vocal, 0, 1, 80);
        graph(bass, other, 1.2, 220);
        graph(other, drum, 2.5, -320);
        graph(drum, bass, 1.7, -140)
      } else if (counter >= chor2[0] && counter <= chor2[1]) {
        push();
        translate(0, soundMap)
        graph(vocal, 0, 1, 340);
        graph(drum, drum, 1.5, 160);
        graph(other, drum, 2.5, -320);
        pop();
      } else if (counter >= chor3[0]) {
        push();
        scale(scaleMap);
        translate(0, soundMap * 1.5);
        graph(vocal, -drum, 1, 340);
        graph(drum, drum, 1.5, 160);
        graph(other, drum, 2.5, -320); 
        pop();
      }

      //fades from static to visualiser.
      if (counter < chor1[0]) {
        let fadeIn = map(counter, crash[3], chor1[0], 255, 0);
        tint(220, fadeIn);
        image(static, 0, 0, width, height);
      }

    } else if (counter > chor1[1] && counter < chor2[0] || counter > chor2[1] && counter < chor3[0]) {
      let zoom;
      let zoomMap;
      if (counter > chor1[1] && counter < chor1[1] + 100) {
        //zoom in verse 1
        zoom = chor1[1] + 100 - counter;
        zoomMap = map(zoom, 100, 0, 0, 1);
        push();
        scale(zoomMap);
        face(words, vocal, drum, counter, eyeNorm);
        pop();
      } else if (counter > chor1[1] && counter < chor2[0]) {
        //verse 1
        face(words, vocal, drum, counter, eyeNorm);

      } else if (counter > chor2[1] && counter < chor3[0] - 100) {
        //verse 2
        face(words, vocal, drum, counter, eyeAng);

      } else if (counter >= chor3[0] - 100 && counter < chor3[0]) {
        //zoom out verse 2
        zoom = chor3[0] - counter;
        zoomMap = map(zoom, 100, 0, 1, 0);
        push();
        scale(zoomMap);
        face(words, vocal, drum, counter, eyeAng);
        pop();
      } 
    }
    frame();

    //flashes red to bass over all elements
    if (bass >= basVol && counter > chor1[1]) {
      fill(200, 0, 0, 40);
      rect(0, 0, width, height);
    } 
  
    //screen gets redder over time
    overlay(counter);

    //end credit = counter > chor3[1]
    let outro = countMax - chor3[1];
    let outroBeat = outro / 10;
    let fadeOut = map(counter, chor3[1], chor3[1] + 1000, 0, 255);
    if (counter > chor3[1]) {
      fill(0, fadeOut);
      rect(0, 0, width, height);

      let title = 100;
      let sub = 70;
      let suber = 50;

      if (fadeOut >= 260) {
        textFont('Verdana'); // please use CSS safe fonts
        if (bass >= basVol && counter > chor1[1]) {
          strokeWeight (5);
          stroke(200, 0, 0);
        } else {
          noStroke;
        }
        fill(255);

        if (counter < outroBeat*2 + chor3[1]) {
          credittext('Clint Eastwood', title, -50);
          credittext('By Gorillaz', sub, 50);
        } else if (counter < outroBeat*3 + chor3[1]) {
          credittext('Music Visualiser', sub, -50);
          credittext('By Jess', suber, 50);
        } else if (counter < outroBeat*4 + chor3[1]) {
          credittext('Honourable Mentions', sub, -50);
          credittext('Hunter', title, 50);
        } else if (counter < outroBeat*5 + chor3[1]) {
          credittext('Honourable Mentions', sub, -50);
          credittext('Phoebe', title, 50);
        } else if (counter < outroBeat*6 + chor3[1]) {
          credittext('Honourable Mentions', sub, -50);
          credittext("Phoebe's Rats", sub, 50);
        } else if (counter < outroBeat*7 + chor3[1]) {
          credittext('Honourable Mentions', sub, -50);
          credittext("My Mum & Dad", sub, 50);
        } else if (counter >= outroBeat*7 + chor3[1]) {
          credittext('Honourable Mentions', sub, -50);
          credittext("A bird I saw once", sub, 50);
        } else if (counter >= outroBeat*8 + chor3[1]) {
          credittext('Honourable Mentions', sub, -50);
          credittext("Noah the dog", sub, 50);
        } else if (counter >= outroBeat*9 + chor3[1]) {
          credittext('Honourable Mentions', sub, -50);
          credittext("and You", title, 50);
        }
        
      }
    }

    console.log(counter);
  }
  pop();
}

function credittext(message, size, move) {
  textSize(size);
  text(message, 0, move);
}

function introscene() {
  background(60, 70, 80);

  fill(70, 80, 90);
  rect(0, 200, width, 200)
  
  fill(65, 50, 40);
  rect(0, 50, 200, 70);
  triangle(-80, 0, -100, 65, -175, 65);
  triangle(80, 0, 100, 65, 175, 65);
  
  fill(80, 60, 40);
  rect(0, 130, 350, 130)

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

  tint(220, 255);
  image(static, 0, 0, 96 * 2 - 20, 54 * 2 - 20)
    
}

function makevignette() {
  tint(255, 150);
  image(vignette, 0, 0, 960, 540);
}

function graph(wave, move, resize, displace) {
  let barMove;
  if (move == 0) {
    barMove = 0;
  } else {
    barMove = map(move, 0, 100, -7, 7);
  }
  
  push();
  translate(int(barMove) * barSpace + displace, 0);
  soundwave(wave, resize);
  pop();
}

function face(words, vocal, drum, counter, eyetype) {
  push();
  scale(0.9);
  bob = map(vocal, 0, 100, -30, 30);
  translate(0, bob);
  imagetry(words, drum, counter, eyetype);
  pop();
}

function overlay(counter) {
  dead = map(counter, crash[3], 12053, 0, 40);
  fill(255, 50, 50, dead);
  rect(0, 0, width, height);
}

function frame() {
  let frameThicc = 80;
  let frameShad = frameThicc + 20;
  let excess = 50;
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
    rect(0, -height/2, width + excess, frameEdge); //top
    rect(0, height/2, width + excess, frameEdge); //bot
    rect(-width/2, 0, frameEdge, height + excess); //left
    rect(width/2, 0, frameEdge, height + excess); //right
  }
}

function imagetry(words, drum, counter, eyetype) {
  let faceSize = 800;
  let faceOffset = 30;
  let mouthType;

  //mouth stuff, opens mouth when words are said
  if (words == ""){
    mouthType = mouthClos;
  } else {
    mouthType = mouthOpe;
  }
  
  //closes mouth when chorus plays since words dont sync
  if (counter <= chor1[1] || counter >= chor2[0] && counter <= chor2[1] || counter >= chor3[0]) {
    mouthType = mouthClos;
  } 
  image(mouthType, 0, faceOffset, faceSize, faceSize);

  //eye stuff
  let dcolour = map(drum, 50, 100, 0, 255);

  fill(255, dcolour, 0); //changes pupil colour based off drum

  rect(-110, faceOffset - 120, 45, 50); //left pupil
  rect(110, faceOffset - 120, 45, 50); //right pupil

  image(eyetype, 0, 30, faceSize, faceSize); //left eye
  push();
  scale(-1, 1); //flips eye image
  image(eyetype, 0, 30, faceSize, faceSize); //right eye
  pop();
}

function soundwave(instrument, resize) {
  
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