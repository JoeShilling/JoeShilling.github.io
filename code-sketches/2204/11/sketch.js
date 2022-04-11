

var toDraw;
var colours;
var radius = 250;

function setup() {
    cnv = createCanvas(windowWidth,windowHeight);
    setupPattern();

}

function setupPattern() {
    toDraw = []
    colours = []
    toDraw.push({
            sigil: new sigilLayer(windowWidth/2,windowHeight/2, radius,3),
            s:0,
            t:0,
            d:0 // is it done?
    });
    for (let c = 0; c < toDraw[0].sigil.s; c ++) {
        colours.push(getRndColour());
    }
}

function draw() {
    let o;
    let done = 1;
    //p.sDraw();
    noStroke();
    
    for (let o in toDraw) {
        if (toDraw[o].s < toDraw[o].sigil.s) { //only draw if you havent drawn all the segments yet
            
            if (toDraw[o].t <= 1) { //if % is less than 100
                pointt = toDraw[o].sigil.getPoint(toDraw[o].s, toDraw[o].t);
                
                fill(colours[toDraw[o].sigil.s-2]);
                ellipse(pointt.x,pointt.y,2,20); //change this to different shapes?

                
                if (Math.round((toDraw[o].t + Number.EPSILON) * 100) / 100 //add a new shape to the toDraw
 == 0.5 && toDraw[o].sigil.s > 2) {
                    toDraw.push({
                        sigil: new sigilLayer(pointt.x, pointt.y, radius, toDraw[o].sigil.s-1),
                        s:0,
                        t:0,
                        d:0
                    });
                }

                toDraw[o].t += 0.01

            } else { //go to the next segment of the shape
                toDraw[o].t = 0;
                toDraw[o].s +=1;
            }
            //toDraw[o].sigil.wiggleAnchors(); //the COOL function
            toDraw[o].sigil.wiggleControls(0.1);
            done = 0;
        } else {
            toDraw[0].d = 1;
        } 
    }
    
    if (done == 1) {
        setupPattern();
    }
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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
    
    //taken from p5.js example - https://p5js.org/examples/form-regular-polygon.html
    //function polygon(x, y, radius, npoints) {
    
    var angle = TWO_PI / s;
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * r;
        let sy = y + sin(a) * r;
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