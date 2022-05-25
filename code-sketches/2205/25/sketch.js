//trying out 3d stuff
//walking through a forest of tree sprites

//TRANSPARENCY IS A LIE
let img;
let tracks = [];
let step=2;
let cam;

function preload() {
    img = loadImage("tree1.png");
}

function setup() {
    createCanvas(1000, 1000, WEBGL);
    
    //randomly place tracks
    let trackNum = 12;
    for (let i = 0; i < trackNum; i++) {
        print("Finding track position");
        let positionFound = false;
        let pos;
        while (positionFound == false) { //bunch of restrictions on where a track can be placed
            //we want to reduce overlap and keep a clear path in the middle
            positionFound = true;
            pos = getRndInteger(-1000,1001);
            if (pos <= 150 && pos >= -100) { //keep middle path clear
                positionFound = false;
            } else {
                for (let track of tracks) { //no overlaps
                    if (Math.abs(pos - track.xPos) <= 50) {
                        positionFound = false;
                    }
                }
            }
        }
        tracks.push(new spriteTrack(pos,3));
    }
    frameRate(60);
    cam = createCamera();
}

function draw() {
    background("grey");
    
    cam.lookAt(0,0,0);
    cam.setPosition(0,-200,3000);
    
    //image(img,10,10, 10);
    
    //print all sprites from further to closest
    let allSprites = [];
    for (let track of tracks) {
        for (let sprite of track.sprites) {
            allSprites.push(sprite);
        }
        //track.show();
        track.update();
    }
    
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
    
    /*
    for (let track of tracks) {
        track.show();
        track.update();
    } */
}

class spriteTrack { //holds sprites and moves them along the 'track'
    constructor(xPos, step) {
        this.xPos = xPos;
        this.sprites = [];
        this.step = step;
        
    }
    
    update() {
        for (let i = 0; i < this.sprites.length; i++) {
            this.sprites[i].zPos += this.step;
            if (this.sprites[i].zPos > 3020) { //distance limit
                this.sprites.splice(0,1);
            }
        }
        if (getRndInteger(0, 1000 - this.sprites.length) > 970) { //chance of adding new trees
            this.addSprite(img);
        }
    }
    
    addSprite(image) {
        this.sprites.push(new sprite(image, 0, this.xPos));
    }
    
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