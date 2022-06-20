//making it so you can specify the start of a shape at the side

var toDraw;
var colours;
var radius = 250;
var segments = 3
var weird = 0.003;
var sigil;
var sigil2;
var sigil3;


var divide = 2;

function setup() {
    frameRate(2048);
    strokeWeight(10);
    cnv = createCanvas(windowWidth,windowHeight);
    background('black');
    stroke('white');
    sigil =  new sigilLayer(windowWidth/2, windowHeight/2, 150, 5);
    sigil2 =  new sigilLayer(windowWidth/2 - 300,500, 100, 4);
    sigil3 = new sigilLayer(windowWidth/2, 1000, 50, 5);

    cnv.doubleClicked(windowResized);

}

function draw() {

    
    
    
    

    sigil.sDraw();
    sigil.sRotate(TWO_PI/12);
    sigil.sTranslate(createVector(-50,50));
    sigil.wiggleAnchors(weird);
    
    /*
    sigil2.sDraw();
    sigil2.sRotate(TWO_PI-PI/3);
    sigil2.sTranslate(createVector(30,30));
    sigil2.wiggleControls(weird);
    */
    
    /*
    sigil3.sDraw();
    sigil3.sRotate(PI/8);
    sigil3.sTranslate(createVector(-30,-30));
    sigil3.wiggleAnchors(weird);
    sigil3.wiggleControls(weird);
    */
    
    //sigil.wiggleAnchors(0.1);
    
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background('black');
}


//maybe change this function so you specify a point on the edge of the polygon rather than the centre? would allow for connecting sigils
function sigilLayer(x,y,r,s=4) { //x,y are positions, r is approx radius, s is number of segments
    fill(0,0,0);
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;
    this.sDraw = sDraw;
    this.pointPrint = pointPrint;
    this.wiggleAnchors = wiggleAnchors;
    this.wiggleControls = wiggleControls;
    this.getPoint = getPoint;
    this.anchors = [];
    this.controls = [];
    this.sTranslate = sTranslate;
    this.sRotate = sRotate;
    
    //taken from p5.js example - https://p5js.org/examples/form-regular-polygon.html
    //function polygon(x, y, radius, npoints) {
    
    //generates anchor points
    var angle = TWO_PI / s;

    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = (x) + cos(a) * r;
        let sy = (y) + sin(a) * r;
        this.anchors.push(createVector(sx,sy));
    }
    
    //generate control points
    for (let i = 0; i < this.anchors.length; i++) {
        
        let v = createVector(this.anchors[i].x, this.anchors[i].y  - (0.6 * this.r));
        
        if (i != 0) {
            v = rotatePoint(this.anchors[i].x, this.anchors[i].y, i * angle, v.x, v.y);
        }
        let v2  = rotatePoint(this.anchors[i].x, this.anchors[i].y, PI, v.x, v.y  ) ;
        this.controls.push(v);
        this.controls.push(v2);
    }
}

function sTranslate(trans) { //translate sigils
    for (let i in this.anchors) {
        this.anchors[i].add(trans);
    }
    for (let i in this.controls) {
        this.controls[i].add(trans);
    }
}

function sRotate(rotat) { //rotates sigils around their centres
    for (let i in this.anchors) {
        this.anchors[i] = rotatePoint(this.x,this.y, rotat, this.anchors[i].x, this.anchors[i].y);
    }

    for (let i in this.controls) {
        this.controls[i] = rotatePoint(this.x,this.y, rotat, this.controls[i].x, this.controls[i].y);
    }
}


function wiggleAnchors(a=0.1) { //a is maximum possible % change
    for (let i =0; i < this.anchors.length; i++) {
        this.anchors[i].x = wiggle(this.anchors[i].x, this.r, a);
        this.anchors[i].y = wiggle(this.anchors[i].y, this.r, a);
    }
}

function wiggleControls(p=0.1) { //p is maximum possible % change
    for (let i =0; i < this.controls.length; i++) {
        this.controls[i].x = wiggle(this.controls[i].x, this.r, p);
        this.controls[i].y = wiggle(this.controls[i].y, this.r, p);
    }
}

function getPoint(s,t) { //t is the % along the side, s is the side on which you want the point
    if (s == this.anchors.length-1) {
        let points  = [this.anchors[s], this.controls[2* s + 1], this.controls[0], this.anchors[0]];
        return pointAlongCurve(t, points);
    } else {
        let points  = [this.anchors[s], this.controls[2* s + 1], this.controls[2* s + 2], this.anchors[s+1]];
        return pointAlongCurve(t, points);
    }
    
}

function sDraw() { //draw function for a sigil layer
    noFill()
    for (let i = 0; i < this.anchors.length; i++) {
        
        if (i == this.anchors.length-1) {
            bezier(
            this.anchors[i].x, this.anchors[i].y,
            this.controls[2* i + 1].x, this.controls[2* i + 1].y,
            this.controls[0].x, this.controls[0].y,
            this.anchors[0].x, this.anchors[0].y
            );
        } else {
            bezier(
            this.anchors[i].x, this.anchors[i].y,
            this.controls[2* i + 1].x, this.controls[2* i + 1].y,
            this.controls[2* i + 2].x, this.controls[2* i + 2].y,
            this.anchors[i+1].x, this.anchors[i+1].y
            );
        }
    }
}

function pointPrint() { //prints all the anchor and control points of a sigil without connecting them
    push()
    strokeWeight(3);
    for (let i = 0; i < this.anchors.length; i++) {
       fill('black');
       ellipse(this.anchors[i].x, this.anchors[i].y,4);
    } 
    for (let i = 0; i < this.controls.length; i++) {
        fill('orange');
        ellipse(this.controls[i].x, this.controls[i].y,4);
    }
    pop()
}

function bezierShow(a,b,c,d,e,f,g,h) { //prints the curve and the control points
    noFill();
    stroke(255, 102, 0);
    line(a, b, c, d);
    line(e, f, g, h);
    stroke(0, 0, 0);
    bezier(a, b, c, d, e, f, g, h);
}

function wiggle(v, a, p) { //v is value to change, a is the maximum adjustment value, p is the maximum possible adjustment in decimal
    let r = Math.random() + 0.00000001 //just so it doesnt return 0
    p = p * r
    if (Math.random() < 0.5) {
        v = v - (a * p)
        
    } else {
        v = v + (a * p)
    }
    return(v);
}

function rotatePoint(cx, cy, angle, x, y) { // cx,cy are the point to rotate around, angle is angle to rotate, x,y is point
  let s = sin(angle);
  let c = cos(angle);

  // translate point back to origin:
  x -= cx;
  y -= cy;

  // rotate point
  let xnew = x * c - y * s;
  let ynew = x * s + y * c;

  // translate point back:
  x = xnew + cx;
  y = ynew + cy;
  return createVector(x, y);
}

function pointAlongCurve(t, points) { //find point along a bezier curve, t is the % along it you want to find
    
    if (points.length != 1) {
        let newPoints = [];
        for (let i = 0; i < points.length-1; i++) {
            newPoints.push(createVector(
                (1-t)*points[i].x + t*points[i+1].x,
                (1-t)*points[i].y + t*points[i+1].y
            ));
        }
        return pointAlongCurve(t, newPoints);
    } else {
        return points[0]; //i hate javascript
    }
}
