let penSound, penImage;
let shapes = [];

class shape {
    constructor(x,y,image,width,height, clickFunction=clicked) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.clickFunction = clickFunction;
    }
    
    beenClicked(x,y) { //has this shape been clicked?
        if (x >= this.x && x <= (this.x + this.width)) { //this if statements are seperate because i find it easier to read
            if (y >= this.y && this.y <= (this.y + this.height)) {
                             
                this.width+=1;
                this.clickFunction();
                
            }
        }
    }
    
    printImage(x = this.x, y = this.y, w = this.width, h = this.height) {
        image(this.image, x, y, w, h);
    }
}

function clicked() { //default clicked function
    console.log('shape clicked');
}


function preload() {
    soundFormats('mp3');
    penSound = loadSound('sounds/pen');
    penImage = loadImage('images/sharpie.png');
}

function setup() {
    let cnv = createCanvas(windowWidth,windowHeight);

    shapes.push(new shape(100,100, penImage, 100,100, pen));
    shapes.push(new shape(600,100, penImage, 100,100, pen));
    //penImage.mouseClicked(pen);
    
    cnv.mouseClicked(canvasClicked);
    
}

function draw() {
  
    for (let i in shapes) {
        shapes[i].printImage();
    }
    
}

function canvasClicked(){
    for (let i in shapes) {
        shapes[i].beenClicked(mouseX,mouseY);
    }
}

function pen() {
    penSound.play();
}

