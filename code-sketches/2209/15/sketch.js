

var toDraw = [];
var weird = 0.005;

let fileLimit = 100;
let filesGenerated = 0;

var canvasWidth;
var canvasHeight;
var centreX;
var centreY;
var c = 255;
var t = 0;


let scaleFactor = 1;
let translateFactor;
let rotateFactor;
let rotateY, rotateX;

let seed = 0;

let unit =1;

let cnv;
let graph;
let file = 0;

function setup() {
    canvasHeight = 1000;
    canvasWidth = 1000;
    centreX =canvasWidth/2;
    centreY = canvasHeight/2;
    strokeWeight(100);
    

    
    cnv = createCanvas(canvasWidth,canvasHeight);
    graph = createGraphics(canvasWidth, canvasHeight);
    background('black');
    
    
    /*
    toDraw.push({
            sigil: new sigilLayer( centreX, centreY, 190, 3),
            s:0,
            t:0,
    });
    toDraw.push({
            sigil: new sigilLayer( centreX, centreY, 100, 4),
            s:0,
            t:0,
    });
    toDraw.push({
            sigil: new sigilLayer( centreX, centreY, 75, 3),
            s:0,
            t:0,
    });
    toDraw.push({
            sigil: new sigilLayer( centreX, centreY, 15, 4),
            s:0,
            t:0,
    });
    
    toDraw[1].sigil.sTranslate(createVector(-100,0));
    toDraw[2].sigil.sTranslate(createVector(200,0));
    toDraw[3].sigil.sTranslate(createVector(270,270));
    */
    
    generateShapes();

}

function generateShapes() {
    if (filesGenerated < fileLimit) {
        toDraw = [];
        t = 0;
        c = 255;
        background('black');
        noFill();
        seed = getRndInteger(1, 10000000000);
        fill('white');

        switch (seed % 9) { //picking which way to move
            case 1:
                translateFactor = createVector(0,unit);
                break;
            case 2:
                translateFactor = createVector(unit,unit);
                break;
            case 3:
                translateFactor = createVector(unit,0);
                break;
            case 4:
                translateFactor = createVector(unit,-unit);
                break;
            case 5:
                translateFactor = createVector(0,-unit);
                break;
            case 6:
                translateFactor = createVector(-unit,-unit);
                break;
            case 7:
                translateFactor = createVector(-unit,0);
                break;
            case 8:
                translateFactor = createVector(-unit,unit);
                break;
            default:
                translateFactor = createVector(0,0);
        }

        if (seed % 64 < 3) {
            rotateFactor = 3;
        } else {
            rotateFactor = seed%64;
        }

        if (seed % 2 == 1) { //decides the direction of the rotation
            rotateFactor = -rotateFactor;

            noFill();

        }

        switch (seed % 3) { //picking whether to rotate around the centre of the shape or a point within the canvas
            case 1,2:
                rotateX = null;
                rotateY = null;
                break;
            default:
                rotateX = seed % canvasWidth;
                rotateY = seed % canvasHeight;
        }

        unit = canvasWidth / (seed % 20)/100 //sets speed of movement

        scaleFactor = (getRndInteger(9900, 10100))/10000;
        rotate

        toDraw.push({sigil: new sigilLayer(getRndInteger(0, canvasWidth/2) + canvasWidth/4, getRndInteger(0, canvasHeight/2) + canvasHeight/4,  getRndInteger(canvasWidth/8, canvasWidth/3), (seed%10) + 1, seed%2, getRndInteger(3,6))});
    } else {
        noLoop();
    }
    
    
    
    /*
    let num = getRndInteger(1,6);
    for (let i = 0; i < num; i ++) {
        toDraw.push({sigil: new sigilLayer( centreX, centreY, 2, getRndInteger(2,6))});
    }
    for (let i in toDraw) {
        if (getRndInteger(0,2) == 0) {
            toDraw[i].sigil.sTranslate(createVector(getRndInteger(0,40), getRndInteger(0,40)));
        } else {
            toDraw[i].sigil.sTranslate(createVector(-(getRndInteger(0,40)), -(getRndInteger(0,40))));
        }
        
    }
    */
}

function draw() {
    for (let o in toDraw) {
        stroke(c);
        
        c = c - 0.001;
        toDraw[o].sigil.sRotate(PI/rotateFactor, rotateX, rotateY);   
       
        
        toDraw[o].sigil.sDraw();
        
        toDraw[o].sigil.sTranslate(translateFactor);
        toDraw[o].sigil.sScale(createVector(centreX, centreY), scaleFactor , scaleFactor);
        toDraw[o].sigil.wiggleControls(0.01);
        //toDraw[o].sigil.wiggleAnchors(0.03);
        
        /*
        if (toDraw[o].s < toDraw[o].sigil.s) { //only draw if you havent drawn all the segments yet
            
            if (toDraw[o].t <= 1) { //if % is less than 100
                pointt = toDraw[o].sigil.getPoint(toDraw[o].s, toDraw[o].t);
                
                fill('white');
                ellipse(pointt.x,pointt.y,30,9); //change this to different shapes?

                toDraw[o].t += 0.005

            } else { //go to the next segment of the shape
                toDraw[o].t = 0;
                toDraw[o].s +=1;
            }

            // //the COOL function
            //toDraw[o].sigil.wiggleControls(0.1);
            

            //toDraw[o].sigil.sRotate(PI/10);
            //toDraw[o].sigil.sTranslate(createVector(-30,-30));
            toDraw[o].sigil.wiggleControls(weird);
            toDraw[o].sigil.wiggleAnchors(weird/4);
            toDraw[o].sigil.sScale(createVector(toDraw[o].sigil.x, toDraw[o].sigil.y), scaleFactor , scaleFactor);

        } else {
            toDraw[o].s = 0;
        }
        */
    }
    t +=1;
    if (t > 700) {
        image(graph,0,0);
        //saveCanvas(cnv, 'image' + seed , 'png');
        filesGenerated+=1;
        generateShapes();
        
    }
}



class sigilLayer{ 
    constructor(x,y,r,w,filled,s=4) { //x,y are positions, r is approx radius, s is number of segments
        fill(0,0,0);
        this.x = x;
        this.y = y;
        this.r = r;
        this.weight = w;
        this.isFilled = filled;
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
    
    sRotate(rotat, x=null, y=null) { //rotates sigils around their centres
        
        if (x != null && y != null) {
            for (let i in this.anchors) {
            this.anchors[i] = rotatePoint(x,y, rotat, this.anchors[i].x, this.anchors[i].y);
            }
            for (let i in this.controls) {
                this.controls[i] = rotatePoint(x,y, rotat, this.controls[i].x, this.controls[i].y);
            }
        } else {
            for (let i in this.anchors) {
            this.anchors[i] = rotatePoint(this.x,this.y, rotat, this.anchors[i].x, this.anchors[i].y);
            }
            for (let i in this.controls) {
                this.controls[i] = rotatePoint(this.x,this.y, rotat, this.controls[i].x, this.controls[i].y);
            }
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
    
    sDraw(image=null) { //draw function for a sigil layer, parameter lets you draw to graphics objects
        if (this.isFilled == 0) {
            noFill();
        } else {
            fill('black');
        }
        strokeWeight(this.weight);
        
        for (let i = 0; i < this.anchors.length; i++) {
            if (i == this.anchors.length-1) {
                if (image === null) {
                    bezier(
                        this.anchors[i].x, this.anchors[i].y,
                        this.controls[2* i + 1].x, this.controls[2* i + 1].y,
                        this.controls[0].x, this.controls[0].y,
                        this.anchors[0].x, this.anchors[0].y
                    );
                } else {
                    image.bezier(
                        this.anchors[i].x, this.anchors[i].y,
                        this.controls[2* i + 1].x, this.controls[2* i + 1].y,
                        this.controls[0].x, this.controls[0].y,
                        this.anchors[0].x, this.anchors[0].y
                    );
                }
                
            } else {
                if (image === null) {
                    bezier(
                    this.anchors[i].x, this.anchors[i].y,
                    this.controls[2* i + 1].x, this.controls[2* i + 1].y,
                    this.controls[2* i + 2].x, this.controls[2* i + 2].y,
                    this.anchors[i+1].x, this.anchors[i+1].y
                    );
                } else {
                    image.bezier(
                    this.anchors[i].x, this.anchors[i].y,
                    this.controls[2* i + 1].x, this.controls[2* i + 1].y,
                    this.controls[2* i + 2].x, this.controls[2* i + 2].y,
                    this.anchors[i+1].x, this.anchors[i+1].y
                    );
                }
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
