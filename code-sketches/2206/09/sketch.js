
let cnv;
let tapeImage1;
let playImage;
let rec1, rec2, rec3;


let objects = [];

function preload() {
    tapeImage1 = loadImage("images/tape.png");
    playImage = loadImage("images/play.png");
    rec1 = loadImage("images/receiver1.png");
    rec2 = loadImage("images/receiver2.png");
    rec3 = loadImage("images/receiver3.png");
}

function setup() {
    colorMode(HSB);
    cnv = createCanvas(1000,1000);
    cnv.mousePressed(setDragged);
    cnv.mouseReleased(setClicked);
    
    objects.push(new reciever(500,500, [rec1, rec2, rec3], 250, 100 ));
    objects.push(new tape(100,100,tapeImage1, 187, 25));
    objects.push(new tape(100,200,tapeImage1, 187, 25));
    objects.push(new button(400,400, playImage, 50,50, () => {print("pressed")}));
}

function draw() {
    background("clear");
    
    
    for (let ob of objects) {
        ob.update();
        ob.show();
    }
}

/*
function overlapping(pos1, w1, h1, pos2, w2, h2) { //do two given rectangles overlap, pos should be given as vectors, w & h and width and height
 
    // If one rectangle is on left side of other
    if (pos1.x > pos2.x + w2 || pos2.x > pos1.x + w1) {
        return false;
    }

    // If one rectangle is above other
    if (pos1.y + h1 > pos2.y || pos2.y + h2 > pos1.y) {
        return false;
    }

    return true;
    
}
*/

function overlapping( l1,  r1,  l2,  r2) {
        // If one rectangle is on right side of other
        if (r1.x < l2.x || l1.x > r2.x) {
            return false;
        }
 
        // If one rectangle is below the other
        if (l1.y > r2.y || l2.y > r1.y) {
            return false;
        }
        return true;
    }

//classes and related functions go below the line
//#############################################################################

function setDragged() { //sets objects as dragged
    for (let ob of objects) {
        if (ob.mouseHover()) {
            if (ob.constructor.name == "tape") {
                ob.state = ob.states[1];
            }

        }
    }
}

function setClicked() { //if mouse is released on an object
    for (let ob of objects) {
        if (ob.mouseHover()) {
            if (ob.constructor.name == "button") {
                ob.content();
            }

        }
    }
} 

class interactable { //objects that can be clicked and dragged around.
    constructor(xPos, yPos, image, width, height) {
        this.pos = createVector(xPos, yPos);
        this.states = ["idle", "dragged"];
        this.state = this.states[0];
        this.image = image;
        this.width = width;
        this.height = height;
        
        this.oldMousePos = null;
    }
    
    mouseHover() {
        if (((mouseX > this.pos.x) && (mouseX < this.pos.x + this.width)) && ((mouseY > this.pos.y) && (mouseY < this.pos.y + this.height))) {
            return true;
        } else {
            return false;
        }
    }
    
    update() {
        //setting state to 'dragged' is now done by setDragged()
        
        if (!mouseIsPressed && this.state == this.states[1]) {
            this.state = this.states[0];
            this.oldMousePos = null;
        }
        //print(this.state);
        
        switch (this.state) {
            case (this.states[1]):
                if (this.oldMousePos == null) {
                    this.oldMousePos = createVector(mouseX, mouseY);
                }
                
                let movement = p5.Vector.sub(createVector(mouseX, mouseY), this.oldMousePos);
                this.pos.add(movement);
                
                this.oldMousePos = createVector(mouseX, mouseY);
                break;
        } 
    }
    
    show() {
        push();
        noStroke();
        fill(306,24,85);
        let width = 10;
        switch (this.state) {
            case (this.states[1]):
                rect(this.pos.x-width, this.pos.y-width, this.width + width * 2, this.height + width * 2);
            break;    
        }
        image(this.image, this.pos.x, this.pos.y, this.width, this.height);
        pop();
        
    }
    
} //class for dragable images

class tape extends interactable {
    constructor(xPos, yPos, image, width, height, content) {
        super(xPos, yPos, image, width, height);
        this.content = content; //what the tape links to
    }
}



class button { //clickable, should probably combine this and interactable with a central base class. can do that at some point in the future
    constructor(xPos, yPos, image, width, height, content) {
        this.pos = createVector(xPos, yPos);
        this.image = image;
        this.width = width;
        this.height = height;
        this.content = content; //what it does when clicked? should be a function
    }
    
    mouseHover() {
        if (((mouseX > this.pos.x) && (mouseX < this.pos.x + this.width)) && ((mouseY > this.pos.y) && (mouseY < this.pos.y + this.height))) {
            return true;
        } else {
            return false;
        }
    }
    
    update() {
        return;
    }
    
    show() {
        image(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }
    
} //clickable

class reciever {
    constructor (xPos, yPos, images, width, height) {
        this.pos = createVector(xPos, yPos);
        this.states = ["empty", "nearby", "full"];
        this.state = this.states[0];
        this.images = images; //needs an image for each state, ideally all the same size
        this.width = width;
        this.height = height;
    }

    
    update() {
        this.state = this.states[0];
        for (let ob of objects) {
            if (ob.constructor.name == "tape") {
                let l1 = createVector(this.pos.x, this.pos.y);
                let r1 = createVector(this.pos.x + this.width, this.pos.y + this.height);
                let l2 = createVector(ob.pos.x, ob.pos.y);
                let r2 = createVector(ob.pos.x + ob.width, ob.pos.y + ob.height);
                if ( overlapping(l1, r1, l2, r2) ) {
                    this.state = this.states[1];
                }
            }
        }
    }
    
        
    mouseHover() {
        if (((mouseX > this.pos.x) && (mouseX < this.pos.x + this.width)) && ((mouseY > this.pos.y) && (mouseY < this.pos.y + this.height))) {
            return true;
        } else {
            return false;
        }
    }
    
    show () {
        switch (this.state) {
            case (this.states[0]):
                image(this.images[0],this.pos.x, this.pos.y,  this.width, this.height);
                break;
            case (this.states[1]):
                image(this.images[1],this.pos.x, this.pos.y,  this.width, this.height);
                break;
            case (this.states[2]):
                image(this.images[2],this.pos.x, this.pos.y,  this.width, this.height);
                break;
        }
    }
    
} //interacts with tapes