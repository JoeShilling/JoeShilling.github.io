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
            pos = getRndInteger(-500,501);
            if (pos <= 100 && pos >= -100) { //keep middle path clear
                positionFound = false;
            } else {
                for (let track of tracks) { //no overlaps
                    if (Math.abs(pos - track.xPos) <= 50) {
                        positionFound = false;
                    }
                }
            }
        }
        tracks.push(new spriteTrack(pos,1));
    }
    frameRate(60);
    cam = createCamera();
}

function draw() {
    background("grey");
    
    cam.lookAt(0,0,0);
    cam.setPosition(0,0,2000);
    
    //image(img,10,10, 10);
    for (let track of tracks) {
        track.show();
        track.update();
    }
}

class spriteTrack { //holds sprites and moves them along the 'track'
    constructor(xPos, step) {
        this.xPos = xPos;
        this.sprites = [];
        this.step = step;
        
    }
    
    show() {
        push();
        translate(this.xPos,0,0);
        for (let i = this.sprites.length-1; i >= 0; i--) {
            this.sprites[i].show();
        }
        pop();
    }
    
    update() {
        for (let i = 0; i < this.sprites.length; i++) {
            this.sprites[i].position += this.step;
            if (this.sprites[i].position > 2000) { //distance limit
                this.sprites.splice(0,1);
            }
        }
        if (getRndInteger(0, 1000 - this.sprites.length) > 990) { //chance of adding new trees
            this.addSprite(img);
        }
    }
    
    addSprite(image) {
        this.sprites.push(new sprite(image, 0));
    }
    
}

class sprite {
    constructor(image, position) {
        this.image = image;
        this.position = position;
        this.height = getRndInteger(300,401);
        
        let temp = this.image.width/this.image.height;
        this.width = this.height * temp;
    }
    
    show() {
        push();
        
        translate(0,0,this.position);
        texture(this.image);
        noStroke();
        plane(this.width, this.height);
        pop();
        //torus(30,15);
    }
}