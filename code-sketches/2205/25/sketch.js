//trying out 3d stuff
//walking through a forest of tree sprites

//TRANSPARENCY IS A LIE
let img;
let pathImg;
let floorImg;
let hog1, hog2;
let tracks = [];
let step=3;
let cam;
let allSprites = [];
let floorSprites = [];


function preload() {
    img = loadImage("images/tree1.png");
    floorImg = loadImage("images/floor.png");
    pathImg = loadImage("images/path.png");
    hog1 = loadImage("images/hog1.png");
    hog2 = loadImage("images/hog2.png");
    
}

function setup() {
    createCanvas(1465, 1100, WEBGL);
    
    frameRate(50);
    cam = createCamera();
    for (let i = 500; i < 10500; i += 1000) {
        floorSprites.push(new floor(pathImg, 0, 0, i));
        floorSprites.push(new floor(floorImg, 1000, 0, i));
        floorSprites.push(new floor(floorImg, - 1000, 0, i));
        floorSprites.push(new floor(floorImg, - 1500, 0, i));
        floorSprites.push(new floor(floorImg, 1500, 0, i));
        floorSprites.push(new floor(floorImg, 2000, 0, i));
        floorSprites.push(new floor(floorImg, -2000, 0, i));
        floorSprites.push(new floor(floorImg, -2500, 0, i));
        floorSprites.push(new floor(floorImg, 2500, 0, i));
    }
    
    for (let i = 0; i < 200; i++) {
        allSprites.push(new tree(img, getSpriteXpos(), 0, getRndInteger(100,10000)));
    }
    
    //allSprites.push(new hog(0,50,9000));
}

function draw() {
    background('#7ccedd');
    print(allSprites.length);
    cam.lookAt(0,0,0);
    cam.setPosition(0,-170 + sin(frameCount/10) * 5,9700);
    
    //image(img,10,10, 10);
    
    //print all sprites from further to closest

    //updateSprites();
    
    for (let i = 0; i < allSprites.length; i++) { //BUBBLE SORT BBY!!
        for (let j = 0; j < (allSprites.length - i - 1); j++) {
            if (allSprites[j].zPos > allSprites[j+1].zPos) {
                let temp = allSprites[j];
                allSprites[j] = allSprites[j+1];
                allSprites[j+1] = temp;
            }
        }
    }
    
    push();
    noStroke();
    fill('#7ccedd');
    plane(7000,7000);
    pop();
    
    for (let f of floorSprites) {
        f.show();
        f.update();
    }
    
    for (let s of allSprites) {
        s.show();
        s.update();
    }

}

function addSprite(image) {
    allSprites.push(new tree(image, getSpriteXpos(), 0, 0));
}

function getSpriteXpos() {
    let positionFound = false;
    let pos;
    while (positionFound == false) { //bunch of restrictions on where a track can be placed
        //we want to reduce overlap and keep a clear path in the middle
        positionFound = true;
        pos = getRndInteger(-3000,3001);
        if (pos <= 250 && pos >= -150) { //keep middle path clear
            positionFound = false;
        }
    }
    return(pos);
}

class sprite {
    constructor(image, xPos, yPos, zPos) {
        this.image = image;
        this.xPos = xPos;
        this.zPos = zPos;
        this.yPos = yPos;
    }
    
    update() {
        this.zPos += step;
        this.zPos = this.zPos % 10000;
    }
}

class tree extends sprite{
    constructor(image, xPos, yPos, zPos) {
        super(image, xPos, yPos, zPos);
        this.height = getRndInteger(300,1201);
        let temp = this.image.width/this.image.height;
        this.width = this.height * temp;
    }
    
    show() {
        push();
        
        translate(this.xPos,-this.height/2 + this.height/25,this.zPos);
        texture(this.image);
        noStroke();
        plane(this.width, this.height);
        pop();
        //torus(30,15);
    }
    
}

class floor extends sprite{
    constructor(image, xPos, yPos, zPos) {
        super(image, xPos, yPos, zPos);
        
    }
    
    show() {
        push();
        rotateX(PI/2);
        texture(this.image);
        noStroke();
        translate(this.xPos,this.zPos,this.yPos);
        plane(this.image.width, this.image.height);
        pop();
    }
}

class hog extends sprite{
    constructor(xPos, yPos, zPos) {
        super(null, xPos, yPos, zPos);
        this.image = [hog1, hog2];
        this.imageNum = 0;
        
        this.height = 200;
        this.width = 300;
    }
    
    update() {
        this.zPos += step;
        this.zPos = this.zPos % 10000;
        
        if (frameCount % 80 == 0) {
            this.imageNum +=1;
            this.imageNum = this.image.length % this.imageNum;
        }
    }
    
    show() {
        push();
        texture(this.image[this.imageNum]);
        noStroke();
        translate(this.xPos,this.zPos,this.yPos);
        plane(this.width, this.height);
        pop();
    }
    
}
