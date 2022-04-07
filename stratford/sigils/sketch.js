function setup() {
    cnv = createCanvas(windowWidth,windowHeight);
    /*
    noFill();
    stroke(255, 102, 0);
    line(85, 20, 10, 10);
    line(90, 90, 15, 80);
    stroke(0, 0, 0);
    bezier(85, 20, 10, 10, 90, 90, 15, 80);
    */
    
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
    
}

function draw() {
  // put drawing code here
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function bezierShow(a,b,c,d,e,f,g,h) {
    noFill();
    stroke(255, 102, 0);
    line(a, b, c, d);
    line(e, f, g, h);
    stroke(0, 0, 0);
    bezier(a, b, c, d, e, f, g, h);
}