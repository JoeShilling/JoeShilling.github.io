
let cnv;
let tapeImage1;
let playImage;
let ejectImage;
let rec1, rec2, rec3;


let objects = [];

//Processing functions  -preload/setup/draw
//#############################################################################

function preload() {
    tapeImage1 = loadImage("images/tape.png");
    playImage = loadImage("images/play.png");
    ejectImage = loadImage("images/eject.png");
    rec1 = loadImage("images/receiver1.png");
    rec2 = loadImage("images/receiver2.png");
    rec3 = loadImage("images/receiver3.png");
}

function setup() {
    colorMode(HSB);
    cnv = createCanvas(1000,1000);
    cnv.mousePressed(setDragged);
    cnv.mouseReleased(setClicked);
    
    let reciever1 = new reciever(500,500, [rec1, rec2, rec3], 250, 100 );
    
 
    let pButton = new button(reciever1.pos.x - 75 , reciever1.pos.y + (reciever1.height * 0.5) - 25, playImage, 50,50, () => {reciever1.playTape()});
    
    
    
    let eButton = new button(reciever1.pos.x + reciever1.width + 25 , reciever1.pos.y + (reciever1.height * 0.5) - 25, ejectImage, 50,50,  () => {reciever1.ejectTape()});
    
    let tape1 = new tape(100,100,tapeImage1, 187, 25, "I'm tape 1");
    let tape2 = new tape(100,200,tapeImage1, 187, 25, "I'm tape 2");
    
    tape1.state = "test";
    
    /*
    objects.push(new reciever(500,500, [rec1, rec2, rec3], 250, 100 ));
    objects.push();
    objects.push(new tape(100,200,tapeImage1, 187, 25));
    objects.push(pButton);
    objects.push(eButton);
    */
}

function draw() {
    background("clear");
    
    objects[1].state = "test";
    
    for (let ob of objects) {
        ob.update();
        ob.show();
    }
}

//



//classes and related functions go below the line
//#############################################################################
//TODO - order of neededness?
//create a setter for the state system, only allow it to be set to values in the states property
//move the generic classes into a seperate file for portability
//create layering system?
//create grouping system?


function setDragged() { //sets objects as dragged
    for (let ob of objects) {
        if (ob.mouseHover()) {
            if (ob.tags.includes("dragable") ) {
                ob.state = ob.states[1];
            }

        }
    }
} //sets draggable objects to 'dragged' state

function setClicked() { //if mouse is released on an object
    for (let ob of objects) {
        if (ob.mouseHover()) {
            if (ob.tags.includes("button")) {
                ob.content();
            }

        }
    }
} //runs the click function on click objects

class interactable { //objects that can be interacted with.
    constructor(xPos, yPos, image, width, height) {
        this.tags = ["interactable"];
        this.pos = createVector(xPos, yPos);
        this.states = ["idle"];
        this.state = this.states[0];
        this.image = image;
        this.width = width;
        this.height = height;
        
        objects.push(this);
    }
    
    update() {
        return;
    }
    
    show() {
        image(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }
    
    mouseHover() {
        if (((mouseX > this.pos.x) && (mouseX < this.pos.x + this.width)) && ((mouseY > this.pos.y) && (mouseY < this.pos.y + this.height))) {
            return true;
        } else {
            return false;
        }
    }
    
    overlap(l2, r2) { //vectors showing the upper left corner and bottom right corner of the rectangle that overlaps
        let l1 = createVector(this.pos.x, this.pos.y);
        let r1 = createVector(this.pos.x + this.width, this.pos.y + this.height);
        
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
    
    
} //objects that can be interacted with.

class dragable extends interactable { //objects that can be dragged around
    constructor (xPos, yPos, image, width, height) {
        super(xPos, yPos, image, width, height);
        this.states = ["idle", "dragged"];
        this.tags.push("dragable");
        this.oldMousePos = null;
    }
    
    update() {
        //setting state to 'dragged' is now done by setDragged()

        if (!mouseIsPressed && this.state == this.states[1]) {
            this.state = this.states[0];
            this.oldMousePos = null;
        }

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
    

    
    
} //generic, objects that can be dragged around

class tape extends dragable { //specifically tape objects
    constructor(xPos, yPos, image, width, height, content) {
        super(xPos, yPos, image, width, height);
        this.tags.push("tape");
        this.content = content; //what the tape links to
        this.states = ["idle", "dragged", "held"];
    }
    
    update() {
        //setting state to 'dragged' is now done by setDragged()

        if (!mouseIsPressed && this.state == this.states[1]) {
            this.state = this.states[0];
            this.oldMousePos = null;
        }

        switch (this.state) {
            case ("dragged"):
                if (this.oldMousePos == null) {
                    this.oldMousePos = createVector(mouseX, mouseY);
                }

                let movement = p5.Vector.sub(createVector(mouseX, mouseY), this.oldMousePos);
                this.pos.add(movement);

                this.oldMousePos = createVector(mouseX, mouseY);
                break;
            case ("held"):
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
} //bespoke,  tape objects

class button extends interactable { //clickable, should probably combine this and interactable with a central base class. can do that at some point in the future
    constructor(xPos, yPos, image, width, height, content) {
        super(xPos, yPos, image, width, height);
        this.tags.push("button");
        this.content = content;
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
    
} //generic, clickable

class reciever extends interactable { //holds tapes, does thing depending on the content of the tape
    constructor (xPos, yPos, images, width, height) {
        super(xPos, yPos, images, width, height);
        this.states = ["idle", "nearby", "full"];
        this.state = this.states[0];
        this.images = images; //needs an image for each state, ideally all the same size
        this.heldTape = null;

    }

    
    update() {
        this.state = this.states[0];
        
        for (let ob of objects) {
            if (ob.tags.includes("tape")) {
                
                let l2 = createVector(ob.pos.x, ob.pos.y);
                let r2 = createVector(ob.pos.x + ob.width, ob.pos.y + ob.height);
                if ( this.overlap(l2, r2) ) {

                    if (ob.state == "dragged") {
                        this.state = "nearby";
                    } else if (ob.state == "idle" || ob.state == "held") {
                        this.holdTape(ob);
                        

                    }
                }
            }
        }
    }
    
    show () {
        switch (this.state) {
            case ("idle"):
                image(this.images[0],this.pos.x, this.pos.y,  this.width, this.height);
                break;
            case ("nearby"):
                image(this.images[1],this.pos.x, this.pos.y,  this.width, this.height);
                break;
            case ("full"):
                image(this.images[2],this.pos.x, this.pos.y,  this.width, this.height);
                break;
        }
    }
    
    playTape() {
        print("playing");
        print(this.state);
        if (this.state == "full") {
            print(this.heldTape.content);
        } else {
            return false;
        }
    }
    
    holdTape(tape) {
        if (this.state != "full") {
            this.state= "full";
            this.heldTape = tape;
            this.heldTape.state= "held";
            
            this.heldTape.pos.x = (this.pos.x + 0.5 * this.width) - this.heldTape.width * 0.5;
            this.heldTape.pos.y = (this.pos.y + 0.5 * this.height) - this.heldTape.height * 0.5;
            
        } else {
            return false; //failed
        }
    }
    
    ejectTape() {
        print("ejecting");
        if (this.state == "full") {
            this.state = "idle";
            this.heldTape.state = "idle";
            
            this.heldTape.pos.x = this.pos.x + (0.5 * this.width) - 0.5 * this.heldTape.width;
            this.heldTape.pos.y = this.pos.y + this.height + 30;
            
            let temp = this.heldTape;
            this.heldTape = null;
            return temp;
        } else {
            return null;
        }
    }
    
} //bespoke, interacts with tapes