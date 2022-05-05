let penSound, penImage; //0
let coffeeSound, coffeeImage; //1
let dryerSound, dryerImage; //2
let mouseSound, mouseImage; //3

let shapes = [];
let dragStart, soundLoop;
let sounds = [];




let circleProgress = 0;
let circleSelector = 0;
let directions = [0,1,2,3];


let diamondRadius = 20;

let rotateDiamond = 1;

class snake {
    constructor(x,y, direction) {
        this.a1 = createVector(x,y);
        this.c1 = createVector(x,y);
        this.c2 = createVector(x,y);
        this.a2 = createVector(x,y);
        this.delta = 256;
        
        switch (direction) {
            case 1:
                this.direction = createVector(1,0);
                break;
            case 2:
                this.direction = createVector(0,-1);
                break;
            case 3:
                this.direction = createVector(-1,0);
                break;
            default:
                this.direction = createVector(0,1);
                
        }
    }
    
    grow (length, rotation) {
        let unit = this.direction.copy();
        
        
        //this.delta = this.delta * 1.01;
        this.direction.rotate(PI/this.delta);
        console.log(this.direction.toString());
        this.c1.add(this.direction);
        
        
        for (let i = 0; i < 3; i++) {this.direction.rotate(PI/this.delta);}
        
        this.c2.add(p5.Vector.mult(this.direction , 1.5));
        
        for (let i = 0; i < 7; i++) {this.direction.rotate(PI/this.delta);}

        this.a2.add(p5.Vector.mult(this.direction, 2));
        console.log(p5.Vector.mult(this.direction, 2));

    }
    
    print() {
        //push();
        strokeWeight(5);
        stroke(0);
        
        bezier(this.a1.x, this.a1.y, this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.a2.x, this.a2.y);
        
        fill('#2ae0a1');
        ellipse(this.c1.x, this.c1.y, 20); //green
        fill('#d22ae0');
        ellipse(this.c2.x, this.c2.y, 20); //purple
        fill('#e0e02a');
        ellipse(this.a2.x, this.a2.y, 20); //yellow
        
        //pop();
    }
}

class shape {
    constructor(x,y, width,height, sound, scaleLimit=2) { //x,y is the centre point
        this.x = x;
        this.y = y;
        this.swidth = width; //starting width
        this.width = width;
        this.sheight = height; //starting height
        this.height = height;
        this.scaleLimit = scaleLimit;

        this.looping = 0;
        this.shrinking = 0;
        this.rotation = 0;
        
        switch (sound) {
            case 0:
                this.sound = penSound;
                this.image = penImage;
                this.looper = new p5.SoundLoop(penLooper, this.ratio);
                break;
            case 1:
                this.sound = coffeeSound;
                this.image = coffeeImage;
                this.looper = new p5.SoundLoop(coffeeLooper, this.ratio);
                break;
            case 2:
                this.sound = dryerSound;
                this.image = dryerImage;
                this.looper = new p5.SoundLoop(dryerLooper, this.ratio);
                break;
            default:
                this.sound = mouseSound;
                this.image = mouseImage;
                this.looper = new p5.SoundLoop(mouseLooper, this.ratio);
                break;  
        }
        
    }
    
    get radius() {
        return((this.width + this.height) / 4);
    }
    
    get ratio() {
        return(this.width/this.swidth);
    }
    
    
    looperFunction(s) {
        console.log("looping");
        console.log(s.looper.interval);
        s.sound.play();
        //penSound.play();
    }
    
    
    beenClicked(x,y) { //has this shape been clicked?

    }
    
    beenDoubleClicked(x,y) {
        /*
        if (x >= (this.x - 0.5 * this.width) && x <= (this.x + 0.5 * this.width) && y >= (this.y - 0.5 * this.height) && y <= (this.y + 0.5 * this.height) ) { 
            
            if (this.looping) { this.looping = false }
            else {this.looping = true}   
        }
        */
        
        if (x >= (this.x - 0.5 * this.width) && x <= (this.x + 0.5 * this.width) && y >= (this.y - 0.5 * this.height) && y <= (this.y + 0.5 * this.height) ) { 
            
            
            //this.clickFunction();
            this.sound.play();
            
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
                    //expanding
                    mult = 1 + (mult / 700);
                    if (mult > 1.15) {
                        mult = 1.01;
                    } else {
                        mult = 1;
                    }
                    
                    
                    this.height = this.height * mult;
                    this.width = this.width * mult;
                    
                    this.looper.interval = this.ratio;
                    
                }
                
            } else if (dragStart.mag() > dragCurrent.mag()) {
 
                this.shrinking = 1;
                if (this.height > this.sheight/this.scaleLimit && this.width > this.swidth/this.scaleLimit) {
                    //shrinking
                    let mult = p5.Vector.mag(dragCurrent.sub(dragStart));
                    
                    mult = 1 - (mult / 700);
                    if (mult < 0.85) {
                        mult = 0.99;
                    } else {
                        mult = 1;
                    }
                    
                    
                    this.height = this.height * mult;
                    this.width = this.width * mult;
                    
                    this.looper.interval = this.ratio;
                    
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
                        this.looper.stop();
                    } else {
                        this.looping = true;
                        this.looper.start();
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







function preload() {
    soundFormats('mp3');
    penSound = loadSound('sounds/pen');
    penImage = loadImage('images/pen.png');
    
    coffeeSound = loadSound('sounds/coffee');
    coffeeImage = loadImage('images/coffee.png');
    
    dryerSound = loadSound('sounds/dryer');
    dryerImage = loadImage('images/dryer.png');
    
    mouseSound = loadSound('sounds/mouse');
    mouseImage = loadImage('images/mouse.png');
    
}

function setup() {
    //userStartAudio();
    let cnv = createCanvas(windowWidth,windowHeight);
    shapes.push(new shape(windowWidth/2,windowHeight/4,  250,250, 0, 2.5));
    shapes.push(new shape(windowWidth/4,windowHeight/2,  250,250, 1, 2.5));
    
    shapes.push(new shape(windowWidth/2, windowHeight - (windowHeight/4),  250,250, 2, 2.5));
    
    shapes.push(new shape( windowWidth-windowWidth/4 ,windowHeight/2, 250,250, 3, 2.5));
    
    
    
    directions[0] = createVector(0,1); //progress 0
    directions[1] = createVector(1,0); //progress 1
    directions[2] = createVector(0,-1); //progress 2
    directions[3] = createVector(-1,0); // progress 3 
    
    //genLine1 = new snake(windowWidth/2, windowHeight/2 + diamondRadius*1.1, 0);
    
    
    //soundLoop = new p5.SoundLoop(sequencer, 1);
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
        //soundLoop.stop();
    } else {
        //soundLoop.start();
    }
    
    
    background('white');
    for (let i in shapes) {
        
        if (shapes[i].looping) {
            shapes[i].rotation -= PI/512;
        }
        
        shapes[i].printImage();
    }
    
    
    push();
    rectMode(RADIUS);
    fill('#266384')
    noStroke();
    translate(windowWidth/2, windowHeight/2);
    rotate( (PI/256) * rotateDiamond);
    rotateDiamond+=1;
    translate(-windowWidth/2, -windowHeight/2);
    
    rect(windowWidth/2, windowHeight/2, diamondRadius, diamondRadius);
    pop();
    
    //bezier(genLine1.c1.x, genLine1.c1.y, genLine1.a1.x, genLine1.a1.y, genLine1.a2.x, genLine1.a2.y, genLine1.c2.x, genLine1.c2.y);
}


function sequencer(timeFromNow) {
    for (let i in shapes) {
        if (shapes[i].looping) {
            shapes[i].sound.play();
            
            
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
    
    userStartAudio();
    
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


//sound loopers because im bad at programming

function penLooper() {
    penSound.play();
}

function coffeeLooper() {
    coffeeSound.play();
}

function dryerLooper() {
    dryerSound.play();
}

function mouseLooper() {
    mouseSound.play();
}


