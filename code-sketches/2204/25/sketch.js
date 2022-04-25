let penSound, penImage;

function preload() {
    soundFormats('mp3');
    penSound = loadSound('sounds/pen');
    penImage = loadImage('images/sharpie.png');
}

function setup() {
    let cnv = createCanvas(windowWidth,windowHeight);
    
    let i = image(penImage, 200,200);
    i.mousePressed(penSound.play());
    
}

function draw() {
  // put drawing code here
}