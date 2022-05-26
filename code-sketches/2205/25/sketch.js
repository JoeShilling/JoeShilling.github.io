//trying out 3d stuff
//walking through a forest of tree sprites

//TRANSPARENCY IS A LIE
let img;
let pathImg;
let floorImg;
let tracks = [];
let step=3;
let cam;
let allSprites = [];
let floorSprites = [];


function preload() {
    img = loadImage("tree1.png");
    floorImg = loadImage("floor.png");
    pathImg = loadImage("path.png");
}

function setup() {
    createCanvas(1000, 1000, WEBGL);
    
    frameRate(50);
    cam = createCamera();
    for (let i = 500; i < 5000; i += 1000) {
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
        allSprites.push(new tree(img, getSpriteXpos(), 0, getRndInteger(100,4500)));
    }
}

function draw() {
    background("grey");
    print(allSprites.length);
    cam.lookAt(0,0,0);
    cam.setPosition(0,-170 + sin(frameCount/10) * 5,4500);
    
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
    fill('#2e3652');
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


function updateSprites() {
        for (let i = 0; i < allSprites.length; i++) {
            allSprites[i].zPos += step;
            if (allSprites[i].zPos > 5000) { //distance limit
                allSprites.splice(i,1);
            }
        }
        if (getRndInteger(0, 10000 - allSprites.length) > 9800) { //chance of adding new trees
            addSprite(img);
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
        pos = getRndInteger(-2000,2001);
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
        this.zPos = this.zPos % 5000;
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
