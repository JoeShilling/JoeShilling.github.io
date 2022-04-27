let penSound, penImage;
let shapes = [];
let dragStart, soundLoop;

let circleProgress = 0;
let circleSelector = 0;
let directions = [0,1,2,3];

class shape {
    constructor(x,y,image,width,height, sound, scaleLimit=2, clickFunction=clicked, doubleFunction) { //x,y is the centre point
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
        this.rotation = 0;
        
        this.sound = sound;
        
    }
    
    get radius() {
        return((this.width + this.height) / 4);
    }
    
    get ratio() {
        return(this.width/this.swidth);
    }
    
    beenClicked(x,y) { //has this shape been clicked?
        if (x >= (this.x - 0.5 * this.width) && x <= (this.x + 0.5 * this.width) && y >= (this.y - 0.5 * this.height) && y <= (this.y + 0.5 * this.height) ) { 
            
            
            //this.clickFunction();
            this.sound.play();
            
        }
    }
    
    beenDoubleClicked(x,y) {
        
        if (x >= (this.x - 0.5 * this.width) && x <= (this.x + 0.5 * this.width) && y >= (this.y - 0.5 * this.height) && y <= (this.y + 0.5 * this.height) ) { 
            
            if (this.looping) { this.looping = false }
            else {this.looping = true}   
        }
    }
    
    beenDragged(dragStartX,dragStartY) { //
        if ((dragStartX >= (this.x - 0.5 * this.width) && dragStartX <= (this.x + 0.5 * this.width) && dragStartY >= (this.y - 0.5 * this.height) && dragStartY <= (this.y + 0.5 * this.height) ) || this.shrinking == 1 ){ //the shrinking variable is required because otherwise it gets too small that the original click is not within the shape
            
            
            let dragStart = createVector(dragStartX,dragStartY);
            let dragCurrent = createVector(mouseX, mouseY);
            let shapeCentre = createVector(this.x, this.y);
            
            
            
            //shrinking & expanding
            dragStart.sub(shapeCentre);

            dragCurrent.sub(shapeCentre);

            
            if (dragStart.mag() < dragCurrent.mag()) {

                
                if (this.height < this.sheight*this.scaleLimit && this.width < this.swidth*this.scaleLimit) {
                    let mult = p5.Vector.mag(dragCurrent.sub(dragStart));
                    
                    mult = 1 + (mult / 700);
                    if (mult > 1.2) {
                        mult = 1.01;
                    } else {
                        mult = 1;
                    }
                    
                    
                    this.height = this.height * mult;
                    this.width = this.width * mult;
                    
                    
                }
                
            } else if (dragStart.mag() > dragCurrent.mag()) {
 
                this.shrinking = 1;
                if (this.height > this.sheight/this.scaleLimit && this.width > this.swidth/this.scaleLimit) {

                    let mult = p5.Vector.mag(dragCurrent.sub(dragStart));
                    
                    mult = 1 - (mult / 700);
                    if (mult < 0.8) {
                        mult = 0.99;
                    } else {
                        mult = 1;
                    }
                    
                    
                    this.height = this.height * mult;
                    this.width = this.width * mult;
                    
                    
                }   
            }
            //end of shrinking/expanding
            
            //rotations
            
            let angleBetween = dragCurrent.angleBetween(directions[circleSelector]);
            
            //angleBetween  = Math.abs(angleBetween);
            
            line(100, 100 , (directions[circleSelector].x * 50) + 100, (directions[circleSelector].y * 50) + 100);
            line(100, 100, dragCurrent.x+100, dragCurrent.y+100);
            
            //console.log(angleBetween.toString());
            
            console.log("circleselector " + circleSelector + " , " + angleBetween.toString() );
            
            if (-angleBetween <= -(PI/2) ) {
                
                circleProgress++;
                circleSelector++;
                
                if (circleSelector == 4) {
                    circleSelector = 0;
                }
                

                if (circleProgress == 4) {
                    console.log("loop complete " + circleProgress);
                    if (this.looping) {
                        this.looping = false;
                    } else {
                        this.looping = true;
                    } 
                }
            }
            
            
            
            
        }
    }
    
    printImage(x = this.x, y = this.y, w = this.width, h = this.height) {
        
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        translate(-this.x, -this.y)
        
        image(this.image, x - (0.5 * this.width), y - (0.5 * this.height), w, h);
        pop();
    }
    
}

function clicked() { //default clicked function
    console.log('shape clicked');
} //default clicked function

function doubled() { //default doubleclicked function
    console.log('shape double clicked');
} //default doubleclicked function

function preload() {
    soundFormats('mp3');
    penSound = loadSound('sounds/pen');
    penImage = loadImage('images/island.jpeg');
}

function setup() {
    //userStartAudio();
    let cnv = createCanvas(windowWidth,windowHeight);
    shapes.push(new shape(400,400, penImage, 200,200, penSound, 2, pen, doubled));
    shapes.push(new shape(600,100, penImage, 100,100, penSound, 2.5, clicked, doubled));
    
    directions[0] = createVector(0,1); //progress 0
    directions[1] = createVector(1,0); //progress 1
    directions[2] = createVector(0,-1); //progress 2
    directions[3] = createVector(-1,0); // progress 3 
    
    soundLoop = new p5.SoundLoop(sequencer, 1);
    
    //penImage.mouseClicked(pen);
}

function draw() {
    
    let stop = true;
    for (let s in shapes) {
        if (shapes[s].looping) {
            stop = false;
        }
    }
    if (stop) {
        soundLoop.stop();
    } else {
        soundLoop.start();
    }
    
    
    background('white');
    for (let i in shapes) {
        
        if (shapes[i].looping) {
            shapes[i].rotation -= PI/512;
        }
        
        shapes[i].printImage();
    }
}


function sequencer(timeFromNow) {
    for (let i in shapes) {
        if (shapes[i].looping) {
            console.log('a shape is looping');
        }
    }
}


//touch event handlers
//mostly just calls the relevant functions of each of the shapes that have been created

function touchEnded() { 
    circleProgress = 0;
    for (let i in shapes) {
        shapes[i].beenClicked(mouseX,mouseY);
        shapes[i].shrinking = 0;
    }
} //mostly used for resetting variables

function touchStarted() {
    console.log("circleprogress " + circleProgress);
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

