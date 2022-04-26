let photo, mask_, cnv, maskedPhoto;
let s1;
let s = 1;

function preload() {
    photo = loadImage('island.jpeg');
}

function setup() {
  // put setup code here
    cnv = createCanvas(photo.width,photo.height);
    mask_ = createGraphics(photo.width,photo.height);
    maskedPhoto = createGraphics(photo.width,photo.height);
    s1 = new sigilLayer(photo.width/2, photo.height/2, 100, 4);
    
}

function draw() {
  // put drawing code here
    
    background(255, 8);
    s1.sRotate(TWO_PI/64);
    
    var sig = createVector(s1.x, s1.y);
    var mousePos = createVector(mouseX, mouseY);
    mousePos.sub(sig);
    mousePos.normalize();
    mousePos.mult(s);
    s += 0.01;
    s1.sTranslate(mousePos);
    maskedPhoto = photo.get(0,0, photo.width, photo.height);
    mask_.clear();
    mask_.noStroke;
    mask_.fill(60);
    
    s1.sDraw(mask_);
    
    maskedPhoto.mask(mask_);
    
    image(maskedPhoto,0,0);
    //image(mask_,0, 400);
    //image(photo,0,0);
}