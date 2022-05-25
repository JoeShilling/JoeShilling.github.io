//trying out 3d stuff
//walking through a forest of tree sprites

//TRANSPARENCY IS A LIE
let img;
let tracks = [];
let step=3;
let cam;
let allSprites = [];


function preload() {
    img = loadImage("tree1.png");
}

function setup() {
    createCanvas(1000, 1000, WEBGL);
    
    frameRate(60);
    cam = createCamera();
}

function draw() {
    background("grey");
    
    cam.lookAt(0,0,0);
    cam.setPosition(0,-170,5000);
    
    //image(img,10,10, 10);
    
    //print all sprites from further to closest
    
    if (getRndInteger(0, 1000 - allSprites.length) > 900) { //chance of adding new trees
        addSprite(img);
    }

    updateSprites();
    
    for (let i = 0; i < allSprites.length; i++) { //BUBBLE SORT BBY!!
        for (let j = 0; j < (allSprites.length - i - 1); j++) {
            if (allSprites[j].zPos > allSprites[j+1].zPos) {
                let temp = allSprites[j];
                allSprites[j] = allSprites[j+1];
                allSprites[j+1] = temp;
            }
        }
    }
    
    for (let sprite of allSprites) {
        sprite.show();
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
    allSprites.push(new sprite(image, 0, getSpriteXpos()));
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
    constructor(image, zPosition, xPosition) {
        this.image = image;
        this.xPos = xPosition;
        this.zPos = zPosition;
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