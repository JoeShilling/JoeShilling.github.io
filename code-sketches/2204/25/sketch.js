let penSound, penImage;
let shapes = [];
let dragStart;

var sounds = {
    "pen":false,
    "dryer":false,
    "coffee":false,
    "mouse":false
}

class shape {
    constructor(x,y,image,width,height, scaleLimit=2, clickFunction=clicked, doubleFunction) { //x,y is the centre point
        this.x = x;
        this.y = y;
        this.image = image;
        this.swidth = width; //starting width
        this.width = width;
        this.sheight = height; //starting height
        this.height = height;
        this.scaleLimit = scaleLimit;
        this.clickFunction = clickFunction;
        this.doubleFunction = doubleFunction;
        this.looping = 0;
        this.shrinking = 0;
    }
    
    get radius() {
        return((this.width + this.height) / 4);
    }
    
    get ratio() {
        return(this.width/this.swidth);
    }
    
    beenClicked(x,y) { //has this shape been clicked?
        if (x >= (this.x - 0.5 * this.width) && x <= (this.x + 0.5 * this.width) && y >= (this.y - 0.5 * this.height) && y <= (this.y + 0.5 * this.height) ) { 
            this.clickFunction();
        }
    }
    
    beenDoubleClicked(x,y) {
        this.doubleFunction();
    }
    
    beenDragged(dragStartX,dragStartY) { //
        if ((dragStartX >= (this.x - 0.5 * this.width) && dragStartX <= (this.x + 0.5 * this.width) && dragStartY >= (this.y - 0.5 * this.height) && dragStartY <= (this.y + 0.5 * this.height) ) || this.shrinking == 1 ){ //the shrinking variable is required because otherwise it gets too small that the original click is not within the shape
            
            
            let dragStart = createVector(dragStartX,dragStartY);
            let dragCurrent = createVector(mouseX, mouseY);
            let shapeCentre = createVector(this.x, this.y);
            
            dragStart.sub(shapeCentre);
            console.log('s');
            console.log(dragStart.mag());
            dragCurrent.sub(shapeCentre);
            console.log('c');
            console.log(dragCurrent.mag());
            
            if (dragStart.mag() < dragCurrent.mag()) {
                console.log('expanding');
                
                if (this.height < this.sheight*this.scaleLimit && this.width < this.swidth*this.scaleLimit) {
                    let mult = p5.Vector.mag(dragCurrent.sub(dragStart));
                    
                    mult = 1 + (mult / 700);
                    if (mult > 1.3) {
                        mult = 1.3;
                    }
                    this.height = this.height * mult;
                    this.width = this.width * mult;
                    
                }
                
            } else if (dragStart.mag() > dragCurrent.mag()) {
                console.log('shrinking'); 
                this.shrinking = 1;
                if (this.height > this.sheight/this.scaleLimit && this.width > this.swidth/this.scaleLimit) {
                    console.log('shrinking2');
                    let mult = p5.Vector.mag(dragCurrent.sub(dragStart));
                    
                    mult = 1 - (mult / 700);
                    if (mult < 0.9) {
                        mult = 0.9;
                    }
                    this.height = this.height * mult;
                    this.width = this.width * mult;
                    
                }   
            }
        }
    }
    
    printImage(x = this.x, y = this.y, w = this.width, h = this.height) {

        image(this.image, x - (0.5 * this.width), y - (0.5 * this.height), w, h);
    }
}

function clicked() { //default clicked function
    console.log('shape clicked');
}

function doubled() {
    console.log('shape double clicked');
}

function preload() {
    soundFormats('mp3');
    penSound = loadSound('sounds/pen');
    penImage = loadImage('images/island.jpeg');
}

function setup() {
    userStartAudio();
    let cnv = createCanvas(windowWidth,windowHeight);
    shapes.push(new shape(400,400, penImage, 200,200, 2,pen));
    shapes.push(new shape(600,100, penImage, 100,100, 2.5, clicked));
    //penImage.mouseClicked(pen);
}

function draw() {
    background('white');
    for (let i in shapes) {
        shapes[i].printImage();
    }
}


function sequencer(timeFromNow) {

}


//touch event handlers
//mostly just calls the relevant functions of each of the shapes that have been created

function touchEnded() {
    for (let i in shapes) {
        shapes[i].beenClicked(mouseX,mouseY);
        shapes[i].shrinking = 0;
    }
}

function touchStarted() {
    dragStart = createVector(mouseX, mouseY);
}

function touchMoved() {
    for (let i in shapes) {
        shapes[i].beenDragged(dragStart.x, dragStart.y);
    }
}

function doubleClicked() {
    for (let i in shapes) {
        shapes[i].beenDoubleClicked(mouseX,mouseY);
    }
}

function pen() {
    penSound.play();
}

