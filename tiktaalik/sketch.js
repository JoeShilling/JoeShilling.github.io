function preload() {
    photo = loadImage('tiktaalik.webp');
}


let quotes = [
    "i am impressed by your air breathing",
    'remember to drink water!',
    'woah you can hold stuff so well with those graspers!',
    "look how far you've come (out of the water)"
    
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