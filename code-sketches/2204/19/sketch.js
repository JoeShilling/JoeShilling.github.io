var toDraw = [];
var cilliaArray = [];


function setup() {
  // put setup code here
    let centreX = windowWidth/2;
    let centreY = windowHeight/2;
    cnv = createCanvas(windowWidth,windowHeight);
    
    toDraw.push({
            sigil: new sigilLayer( centreX, centreY, 380, 3),
            s:0,
            t:0,
    });
    toDraw.push({
            sigil: new sigilLayer( centreX, centreY, 200, 4),
            s:0,
            t:0,
    });
    toDraw.push({
            sigil: new sigilLayer( centreX, centreY, 150, 3),
            s:0,
            t:0,
    });
    toDraw.push({
            sigil: new sigilLayer( centreX, centreY, 30, 4),
            s:0,
            t:0,
    });
    
    toDraw[1].sigil.sTranslate(createVector(-100,0));
    toDraw[2].sigil.sTranslate(createVector(200,0));
    toDraw[3].sigil.sTranslate(createVector(270,270));
}

function draw() {
    // put drawing code here
    let lineLength = 50;
    
    for (let o in toDraw) {
        if (toDraw[o].s < toDraw[o].sigil.s) { //only draw if you havent drawn all the segments yet
            
            if (toDraw[o].t <= 1) { //if % is less than 100
                
                stroke(100,128,109);
                
                pointt = toDraw[o].sigil.getPoint(toDraw[o].s, toDraw[o].t);
                
                pointt2 = rotatePoint(pointt.x, pointt.y, TWO_PI/(toDraw[o].s + 1)*toDraw[o].t, pointt.x, pointt.y+lineLength);
                
                
                
                cilliaArray.push(new cillia(pointt.x, pointt.y, pointt2.x, pointt2.y));
                
                //ellipse(pointt.x,pointt.y,30,9); //change this to different shapes?

                toDraw[o].t += 0.02

            } else { //go to the next segment of the shape
                toDraw[o].t = 0;
                toDraw[o].s +=1;
            }

        }
    
    }
    for (let c in cilliaArray) {
        cilliaArray[c].cdraw();
    }
}

class cillia{
    constructor(x1,y1,x2, y2){
        this.p1 = createVector(x1,y1);
        this.p2 = createVector(x2,y2);
        this.c1 = createVector(x1,y1);
        this.c2 = createVector(x2,y2);
    }
    
    cdraw() {
        bezier(this.p1.x, this.p1.y, this.c1.x ,this.c1.y , this.c2.x, this.c2.y ,this.p2.x, this.p2.y );
    }
    
    intersect(x,y) {
        
    }
    
    //check if cillia crosses with another cillia, if it does, it wiggles untill it does not
    
}


class sigilLayer{ 
    constructor(x,y,r,s=4) { //x,y are positions, r is approx radius, s is number of segments
        fill(0,0,0);
        this.x = x;
        this.y = y;
        this.r = r;
        this.s = s;
        this.anchors = [];
        this.controls = [];
        
        //taken from p5.js example - https://p5js.org/examples/form-regular-polygon.html

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
    
    sTranslate(trans) { //translate sigils
        this.x += trans.x;
        this.y += trans.y;
        for (let i in this.anchors) {
            this.anchors[i].add(trans);
        }
        for (let i in this.controls) {
            this.controls[i].add(trans);
        }
    }
    
    sRotate(rotat) { //rotates sigils around their centres
        for (let i in this.anchors) {
            this.anchors[i] = rotatePoint(this.x,this.y, rotat, this.anchors[i].x, this.anchors[i].y);
        }
        for (let i in this.controls) {
            this.controls[i] = rotatePoint(this.x,this.y, rotat, this.controls[i].x, this.controls[i].y);
        }
    }
    
    sScale(point, fX, fY) {
        for (let i in this.anchors) {
            
            let diff  = this.anchors[i].sub(point);
            diff = diff.mult(fX, fY);
            this.anchors[i] = p5.Vector.add(point, diff);
            
        }
        for (let i in this.controls) {
            
            let diff  = this.controls[i].sub(point);
            diff = diff.mult(fX, fY);
            this.controls[i] = p5.Vector.add(point, diff);
            
        }
    }
    
    wiggleAnchors(a=0.1) { //a is maximum possible % change
        for (let i =0; i < this.anchors.length; i++) {
            this.anchors[i].x = wiggle(this.anchors[i].x, this.r, a);
            this.anchors[i].y = wiggle(this.anchors[i].y, this.r, a);
        }
    }
    
    wiggleControls(p=0.1) { //p is maximum possible % change
        for (let i =0; i < this.controls.length; i++) {
            this.controls[i].x = wiggle(this.controls[i].x, this.r, p);
            this.controls[i].y = wiggle(this.controls[i].y, this.r, p);
        }
    }
    
    getPoint(s,t) { //t is the % along the side, s is the side on which you want the point
        if (s == this.anchors.length-1) {
            let points  = [this.anchors[s], this.controls[2* s + 1], this.controls[0], this.anchors[0]];
            return pointAlongCurve(t, points);
        } else {
            let points  = [this.anchors[s], this.controls[2* s + 1], this.controls[2* s + 2], this.anchors[s+1]];
            return pointAlongCurve(t, points);
        }
    }
    
    sDraw() { //draw function for a sigil layer
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
    
    pointPrint() { //prints all the anchor and control points of a sigil without connecting them
        push()
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