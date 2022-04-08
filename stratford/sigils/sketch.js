function setup() {
    cnv = createCanvas(windowWidth,windowHeight);
    /*
    noFill();
    stroke(255, 102, 0);
    line(85, 20, 10, 10);
    line(90, 90, 15, 80);
    stroke(0, 0, 0);
    bezier(85, 20, 10, 10, 90, 90, 15, 80);
    
    
    strokeWeight(30);
    bezierShow(
        150,100, //anchor 1
        100,70, //control 1
        20,100, //control 2
        50,200 //anchor 2
    );
    bezierShow(
        50,200, //anchor 1
        60,250, //control 1
        150,230, //control 2
        160,200 //anchor 2
    );
    bezierShow(
        160,200, //anchor 1
        165,180, //control 1
        180,140, //control 2
        150,100 //anchor 2
    );
    */
}

function draw() {
  // put drawing code here
    noFill();
    
    s = new sigilLayer(100,100,50,4);
    strokeWeight(5);
    s.sDraw();
    
    t = new sigilLayer(200,200,50,3);
    t.sDraw();
    
    p = new sigilLayer(300,300,50,5);
    p.sDraw();
    
    c = new sigilLayer(400,400,50,2);
    c.sDraw();
    
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function sigilLayer(x,y,r,s=4) { //x,y are positions, r is approx radius, s is number of segments
    fill(0,0,0);
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;
    this.sDraw = sDraw;
    this.pointPrint = pointPrint;
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
