
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20)
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER);
  textSize(24);

  push();
  let lurk = counter/9500 + 0.01;
  scale(lurk);

  // fill(255);
  // ellipse(0, 0, 20, 20);

  nightmare(vocal, drum, bass, other);
  pop();
}

function nightmare(vocal, drum, bass, other) {
  noStroke();

  //eye whites
  fill(255);
  ellipse(width/4, 200, 200, 100);
  ellipse(3*width/4, 200, 200, 100);

  //iris
  let dcolour = map(drum, 0, 100, 100, 255);
  let bcolour = map(bass, 0, 100, 100, 255);
  let ocolour = map(other, 0, 100, 100, 255);
  fill(dcolour, bcolour, ocolour);
  ellipse(width/4, 200, 100, 100);
  ellipse(3*width/4, 200, 100, 100);

  // //nostrils
  // fill(255);
  // ellipse(width/2 - 15, 300, 7, 20); //left
  // ellipse(width/2 + 15, 300, 7, 20); //right

  let mouthup = 300;

  //inner mouth
  fill(255);
  arc(width/2, mouthup, 500, 200, 0, 180);

  //teeth
  stroke(0);
  strokeWeight(4);

  line(width/2 - 200, mouthup, width/2 - 200, mouthup + 200); 
  line(width/2 - 150, mouthup, width/2 - 150, mouthup + 200); 
  line(width/2 - 100, mouthup, width/2 - 100, mouthup + 200); 
  line(width/2 - 50, mouthup, width/2 - 50, mouthup + 200); // left
  line(width/2, mouthup, width/2, mouthup + 200); //mid
  line(width/2 + 50, mouthup, width/2 + 50, mouthup + 200); // right
  line(width/2 + 100, mouthup, width/2 + 100, mouthup + 200); 
  line(width/2 + 150, mouthup, width/2 + 150, mouthup + 200); 
  line(width/2 + 200, mouthup, width/2 + 200, mouthup + 200); 

  //moving mouth
  noStroke();

  let talk = map(vocal, 0, 100, 190, 0);
  fill(0);
  arc(width/2, mouthup - 2, 502, talk, 0, 180);

}