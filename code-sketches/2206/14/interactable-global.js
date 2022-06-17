let objects = []; // all interactables go in here

function setDragged() { //sets objects as dragged
    for (let ob of objects) {
        if (ob.mouseHover()) {
            if (ob.tags.includes("dragable") ) {
                ob.state = ob.states[1];
            }

        }
    }
} //sets draggable objects to 'dragged' state, attached to mouseDragged listener

function setClicked() { //if mouse is released on an object
    for (let ob of objects) {
        if (ob.mouseHover()) {
            if (ob.tags.includes("button")) {
                ob.content();
            }

        }
    }
} //runs the click function on click objects, attached to mousePressed listener

class Interactable { //objects that can be interacted with. everything extends this
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
    
    update() { //basic update
        return;
    }
    
    show() { //basic show
        p5.image(this.image, this.pos.x, this.pos.y, this.width, this.height);
    }
    
    mouseHover() { //check if mouse over the object
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
    
    
} //generic, objects that can be interacted with, everything extends this

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