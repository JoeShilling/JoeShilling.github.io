
let cnv;
let tapeImage1, tapeImage2;
let spraypaintTapeImage;
let playImage;
let ejectImage;
let rec1, rec2, rec3;
let screenImage;


let objects = []; // all interactables go in here

//Processing functions  -preload/setup/draw
//#############################################################################

function preload() {
    tapeImage1 = loadImage("images/weaveTape.png");
    tapeImage2 = loadImage("images/treesTape.png");
    spraypaintTapeImage = loadImage("images/spraypaintTape.png");
    playImage = loadImage("images/play.png");
    ejectImage = loadImage("images/eject.png");
    rec1 = loadImage("images/newReceiver1.png");
    rec2 = loadImage("images/newReceiver2.png");
    rec3 = loadImage("images/newReceiver3.png");
    screenImage = loadImage("images/screen1.png");
}

function setup() {
    colorMode(HSB);
    cnv = createCanvas(windowWidth,windowHeight);
    cnv.mousePressed(setDragged);
    cnv.mouseReleased(setClicked);
    
    let screen1 = new Screen(640,155, screenImage, 600,600);
    let reciever1 = new Reciever(530,755, [rec1, rec2, rec3], 900, 245, screen1 );
    let pButton = new Button(reciever1.pos.x + 50 , reciever1.pos.y + (reciever1.height * 0.5) - 70, playImage, 100,100, () => {reciever1.playTape()});
    
    let eButton = new Button(reciever1.pos.x + reciever1.width - 150 , reciever1.pos.y + (reciever1.height * 0.5) - 70, ejectImage, 100,100,  () => {reciever1.ejectTape()});
    
    let c1 = new ContentObject(
        color(300,86,43),
        "Weave. May 20th 2022.\nThe loom is alive. \nFurther experimentation in my work using autonomous agents to create interesting patterns. Each strand of the weave is an autonomous agent looking for 'food' in order to keep itself alive. The food nodes are indicated by the dots. \nThe design itself was inspired by art deco carpet weaving patterns and wondering how I could recreate those textures computationally. \nInterestingly I found myself removing more and more of the 'intelligence' of the underlying program in pursuit of creating more aesthetically pleasing outcomes. In this model the agents are unlikely to die and there is no threat of predators, meaning they soley move towards the closest fully grown food node.",
        "https://joeshilling.github.io/code-sketches/2205/20-c/index.html");
    
    let c2 = new ContentObject(
        color(110,86,43),
        "Trees. May 25th 2022.\nA stroll through the woods.", 
        "https://joeshilling.github.io/code-sketches/2205/25/index.html");
    
    let c3 = new ContentObject(
        color(175,79,38),
        "Spraypaint. April 11th 2022.\nExperimenting with recursive patterns. \nAnother use of the 'sigil' object I developed early on. A sigil being a shape made up completely of bezier curves that can easily be manipulated with other functions.",
        "https://joeshilling.github.io/code-sketches/2204/11/index.html");
        
    
    let tape1 = new Tape(100,880,tapeImage1, 400, 60, c1);
    let tape2 = new Tape(100,940,tapeImage2, 400, 60, c2);
    let tape3 = new Tape(100,820,spraypaintTapeImage,400,60,c3);

}

function draw() {
    background("white");
    
    push();
    noStroke();
    let c = color(33,60,78);
    fill(c);
    rect(0, 1000, windowWidth, windowHeight);
    pop();
    
    for (let ob of objects) {
        ob.update();
        ob.show();
    }
}

//


function ContentObject(colour, words, url) {
    this.colour = colour;
    this.words = words;
    this.url = url;
}


//interactable classes and related functions go below the line
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

class Interactable { //objects that can be interacted with.
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
    
    
} //generic, objects that can be interacted with.

class Dragable extends Interactable { //objects that can be dragged around
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

class Button extends Interactable { //clickable, should probably combine this and interactable with a central base class. can do that at some point in the future
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

class Tape extends Dragable { //specifically tape objects
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

class Reciever extends Interactable { //holds tapes, does thing depending on the content of the tape
    constructor (xPos, yPos, images, width, height, screen) {
        super(xPos, yPos, images, width, height);
        this.states = ["idle", "nearby", "full"];
        this.state = this.states[0];
        this.images = images; //needs an image for each state, ideally all the same size
        this.heldTape = null;
        this.screen = screen; //connected Screen object

    }

    
    update() {
        this.state = this.states[0];
        
        for (let ob of objects) {
            if (ob.tags.includes("tape")) {
                
                let l2 = createVector(ob.pos.x, ob.pos.y);
                let r2 = createVector(ob.pos.x + ob.width, ob.pos.y + ob.height);
                if ( this.overlap(l2, r2) ) {

                    if (ob.state == "dragged" && this.state!="full") {
                        this.state = "nearby";
                    } else if (ob.state == "idle" || ob.state == "held") {
                        this.holdTape(ob);
                        

                    }
                }
            }
        }
        if (this.state == "full") {
            this.screen.content = this.heldTape.content;
        } else {
            this.screen.content = null;
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
            window.open(this.heldTape.content.url);
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
            this.heldTape.pos.y = (this.pos.y + 0.23 * this.height) - this.heldTape.height * 0.5;
            
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

class Screen extends Interactable {
    constructor(xPos, yPos, images, width, height) {
        super(xPos, yPos, images, width, height);
        this.states = ["idle", "displaying"];
        this.content = null;
    }
    
    update() {
        if (this.content != null) {
            this.state = "displaying";
        } else {
            this.state = "idle";
        }
    }
    
    show() {
        
        if (this.content != null) {
            push();
            fill(this.content.colour);
            
            rect(this.pos.x+5, this.pos.y+5, this.width-10, this.height-10);
            textSize(32);
            fill("black");
            text(this.content.words, this.pos.x + this.width/8, this.pos.y + this.height/8, this.width * 0.8, this.height * 0.8);
            pop();
        } else {
            push();
            fill("black");
            rect(this.pos.x+5, this.pos.y+5, this.width-10, this.height-10);
            pop();
        }
        image(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }
} //bespoke