var centrex = 500;
var centrey = 500;
var spacing = 150;
var bend = 6
var sizeconst = 4

function setup() {
    createCanvas(windowWidth,windowHeight);
    
    //spacing slider
    SpaceSlider = createSlider(0, 255, 150);
    SpaceSlider.position(10, 10);
    SpaceSlider.style('width', '80px');
    
    //bend slider
    BendSlider = createSlider(0, 20, 3);
    BendSlider.position(10, 30);
    BendSlider.style('width', '80px');
    
    SizeSlider = createSlider(0, 4, 1);
    SizeSlider.position(10, 50);
    SizeSlider.style('width', '80px');
    
}

function draw() {
    background(0,20,40);
    noFill();
    centrex=mouseX;
    centrey=mouseY;
    spacing = SpaceSlider.value();
    bend = BendSlider.value();
    sizeconst = SizeSlider.value();
    
    
    stroke(235,255,255);
    strokeWeight(2);
    
    //horizontal
    for (let i = 0.5; i*spacing < height*3; i++) {
        curve(centrex-(sizeconst*width),centrey+ (i*bend) * spacing,
              centrex-(sizeconst*width), centrey+ (i) * spacing,
              centrex+(sizeconst*width),centrey+ (i) * spacing, 
              centrex+(sizeconst*width),centrey+ (i*bend) * spacing);
        
        curve(centrex+(sizeconst*width),centrey- (i*bend) * spacing, 
              centrex+(sizeconst*width),centrey- (i) * spacing,
              centrex-(sizeconst*width),centrey- (i) * spacing, 
              centrex-(sizeconst*width),centrey- (i*bend) * spacing);
        
    };
    
    //vertical
    for (let i = 0.5; i*spacing < width*3; i++) {
        curve(centrex+ (i*bend) * spacing, centrey-(sizeconst*height),
              centrex+ (i) * spacing, centrey-(sizeconst*height),
              centrex+ (i) * spacing, centrey+(sizeconst*height),
              centrey+ (i*bend) * spacing, centrex+(sizeconst*width));
        
        curve(centrex- (i*bend) * spacing, centrey+(sizeconst*height),
              centrex- (i) * spacing, centrey+(sizeconst*height),
              centrex- (i) * spacing, centrey-(sizeconst*height),
              centrey- (i*bend) * spacing, centrex-(sizeconst*width));
        
    };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}