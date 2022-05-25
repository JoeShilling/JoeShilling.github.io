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
    
    frameRate(60);
    cam = createCamera();
    for (let i = 500; i < 6000; i += 1000) {
        floorSprites.push(new floor(pathImg, 0, 0, i));
    }
}

function draw() {
    background("grey");
    
    cam.lookAt(0,0,0);
    cam.setPosition(0,-170,5000);
    
    //image(img,10,10, 10);
    
    //print all sprites from further to closest
    
    //FLOOR

    
    //TREES
    if (getRndInteger(0, 1000 - allSprites.length) > 900) { //chance of adding new trees
        addSprite(img);
    }

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
            if (allSprites[i].zPos > 5020) { //distance limit
                allSprites.splice(i,1);
            }
        }
        if (getRndInteger(0, 1000 - allSprites.length) > 670) { //chance of adding new trees
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
        pos = getRndInteger(-1500,1501);
        if (pos <= 150 && pos >= -100) { //keep middle path clear
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
        this.zPos = this.zPos % 5500;
    }
}

class tree extends sprite{
    constructor(image, xPos, yPos, zPos) {
        super(image, xPos, yPos, zPos);
        this.height = getRndInteger(300,701);
        let temp = this.image.width/this.image.height;
        this.width = this.height * temp;
    }
    
    show() {
        push();
        
        translate(this.xPos,-this.height/2,this.zPos);
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
        print(this.zPos);
        push();
        rotateX(PI/2);
        texture(pathImg);
        noStroke();
        translate(this.xPos,this.zPos,this.yPos);
        plane(this.image.width, this.image.height);
        pop();
    }
    

}
