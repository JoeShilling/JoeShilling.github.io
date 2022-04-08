//050422
//rectangle drawing/recognition

/*



*/
var cnv;
var active_points = [];
var active_polygons = []; //array of polygon objets

function setup() {
    cnv = createCanvas(windowWidth,windowHeight);
    cnv.mousePressed(addPoint)
}

function draw() {
    background(255,255,255);
    
    for (let shape of active_polygons) {
        shape.drawMe();
    }
    
    stroke(0,0,0);
    strokeWeight(1);
    if (active_points.length >= 1) { //draws the moving line, theres gotta be a smarter way of doing this 
        line(active_points[active_points.length-1].x, active_points[active_points.length-1].y, mouseX, mouseY)
    }
    if (active_points.length >= 2) { //draws the previous points together
        for (let i = 0; i < active_points.length-1; i++) {
            
            line(active_points[i].x, active_points[i].y, active_points[i+1].x, active_points[i+1].y)
        }
        line(active_points[active_points.length-1].x, active_points[active_points.length-1].y, mouseX, mouseY)
    }
    
}

function addPoint() {
    active_points.push(createVector(mouseX,mouseY));
    console.log(active_points);
    if (active_points.length >= 4) {
        checkPolygon(active_points);
    }
}

function checkPolygon(ps) { //ps = points
    //this is broke and i dont know why
    //check to see if the specified points connect to make a shape.
    
    //first check to see if the last line intersects with any previous lines
    //put points into Ax + By = C form
    for (let i = 0; i < ps.length-3; i++) { // might have to fiddle with the limit
        
        //checking every other line
        let A1 = (ps[i+1].y - ps[i].y);
        let B1 = (ps[i].x - ps[i+1].x);
        let C1 = (A1 * ps[i].x + B1 * ps[i].y);
        
        // the line just created by the user
        let A2 = (ps[ps.length-1].y - ps[ps.length-2].y);
        let B2 = (ps[ps.length-2].x - ps[ps.length-1].x);
        let C2 = (A2 * ps[ps.length-2].x + B2 * ps[ps.length-2].y);
        
        let det = A1 * B2 - A2 * B1;
        if (det == 0){
            //parallel lines
        } else {
            var X = (B2 * C1 - B1 * C2) / det; //should be the coords of the intersection
            var Y = (A1 * C2 - A2 * C1) / det;
            //then have to check if the intersection is actually on the lines they drew
            //if distance(a,c ) + distance(c,b) = distance (a,b)
            let AC1 = dist(ps[ps.length-1].x, ps[ps.length-1].y, X, Y);
            let CB1 = dist( X, Y, ps[ps.length-2].x, ps[ps.length-2].y);
            let AB1 = dist( ps[ps.length-1].x,  ps[ps.length-1].y, ps[ps.length-2].x , ps[ps.length-2].y);
            
            /* 
            let AC2 = dist(ps[i+1].x, ps[i+1].y, X, Y);
            let CB2 = dist( X, Y, ps[i].x, ps[i].y);
            let AB2 = dist( ps[i+1].x,  ps[i+1].y, ps[i].x , ps[i].y);
            */
            
            let a = Math.round(AC1 + CB1); //this is not good programming
            let b = Math.round(AB1);
            
            if ( a == b ) { //~~PRAISE BE TO THE ROUND FUNCTION~~ // THE ROUND FUNCTION BETRAYED ME
                
                console.log("intersection");
                let output = [];
                output.push(createVector(X,Y));
                for (let j = i+1; j < ps.length-1; j++ ) {
                    output.push( createVector(ps[j].x, ps[j].y) );
                }
                output.push(createVector(X,Y));
                
                active_polygons.push(new Polygon(output));
                
                active_points = []; //clear the existing points
                console.log("AC1 + CB1 = " + a);
                console.log("AB1 = " + b);
            } else {
                console.log("AC1 + CB1 = " + a);
                console.log("AB1 = " + b);
            }
        }
    }  
}

function Polygon(points) {
    this.points = points;
    this.colorFill = color(getRndInteger(0,256),getRndInteger(0,256),getRndInteger(0,256));
    this.drawMe = function() {
        noStroke();
        fill(this.colorFill);
        beginShape();
        for (let p of this.points) {
            vertex(p.x,p.y);
        }
        endShape();
    }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}