/*
scalable representations of designs -

pattern is a class - assign it a pattern when creating

x
y
width
height
colour scheme
draw function - needs everything to be relative.


*/
var activeShapes = [];


function setup() {
    cnv = createCanvas(windowWidth,windowHeight);
    
    let c = [getRndColour(), getRndColour(), getRndColour(), getRndColour()];
    
    activeShapes.push(new Pattern( 0, 0, 400, 400, 0, c));
    activeShapes.push(new Pattern( 400, 0, 400, 400, 0, c));
    activeShapes.push(new Pattern( 400, 400, 400, 400, 0, c));
    activeShapes.push(new Pattern( 0, 400, 400, 400, 0, c));
}

function draw() {
    for (let pat of activeShapes) {
        pat.draw();
    }
}

function Pattern( x, y, width, height, pattern, colours = [getRndColour(), getRndColour(), getRndColour(), getRndColour()]) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colours = colours; //array of 
    this.getPoint = getPoint;
    this.vertex2 = vertex2;
    switch (pattern) {
        case 0:
            console.log("pattern 0 selected");
            this.draw = drawTourist;
            break;
        default:
            console.log("default");
            break;
    }
}

function getPoint(x, y) { //turns percentage into an actual point for Pattern objects
    // x and y should be decimals
    let v  = createVector(this.x + x * this.width, this.y + y * this.height);
    return v; 
}

function vertex2(x,y) { //electric boogaloo
    let p = this.getPoint(x,y);
    vertex(p.x,p.y);
}
