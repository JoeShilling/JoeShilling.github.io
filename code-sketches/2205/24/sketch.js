let colour0;
let colour1;
let colour2;

function setup() {
    
    cnv = createCanvas(windowWidth, windowHeight);
    noLoop();
    
  
    
}

function draw() {
    background("white");
    let temp = getRndColour('hsb');
    let sets = 9;
    for (let i = 0; i < sets ; i++) {
        colour0 = new colourSquare(temp, createVector(50,50 + 120 * (i)));
        
        triad = getColourTriad(temp);
        
        colour1 = new colourSquare(triad[0], createVector(150,50 + 120 * (i )));
        colour2 = new colourSquare(triad[1], createVector(250,50 + 120 * (i )));
        
        colour0.show();
        colour1.show();
        colour2.show();
        
        temp = color((hue(temp) + 10) % 360, saturation(temp), brightness(temp));
        
    }
    
}

class colourSquare {
    constructor(colour, pos) {
        this.colour = colour;
        this.pos = pos;
        this.width = 100;
        this.height = 100;
    }
    
    show() {
        push();
        noStroke();
        fill(this.colour);
        rect(this.pos.x, this.pos.y, this.width, this.height);
        //rect(100,100, this.pos.x, this.pos.y);
        pop();
        text("H: " + Math.round(hue(this.colour)) + " S: " + Math.round(saturation(this.colour)) + " B: " + Math.round(brightness(this.colour)), this.pos.x, this.pos.y + this.height + 10);
    }
}

function doubleClicked() {
    draw();
}
//update pls