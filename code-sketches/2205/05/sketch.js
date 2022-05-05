function preload() {
    photo = loadImage('tiktaalik.webp');
}


let quotes = [
    "I am impressed by your air breathing ability",
    'phrase 2'
]

function setup() {
    
    cnv = createCanvas(windowWidth,windowHeight);
    
    imageMode(CENTER);
    image(photo, windowWidth/2, windowHeight/2, photo.width/4, photo.height/4);
    
    textAlign(CENTER);
    textSize(16);
    text(random(quotes), windowWidth/2, windowHeight/2 + photo.height/4);
    
  // put setup code here
}

function draw() {
  // put drawing code here
}