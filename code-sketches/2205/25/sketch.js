//trying out 3d stuff
//walking through a forest of tree sprites
let img;
let tracks = [];
let step=2;

function preload() {
    img = loadImage("island.jpeg");
}

function setup() {
    createCanvas(1000, 1000, WEBGL);
    tracks.push(new spriteTrack(-100, 2));
    frameRate(1);
}

function draw() {
    background("white");
    
    //image(img,10,10, 10);
    for (let track of tracks) {
        track.show();
        track.update();
    }
}

class spriteTrack {
    constructor(xPos, step) {
        this.xPos = xPos;
        this.sprites = [];
        this.step = step;
        
    }
    
    show() {
        push();
        translate(this.xPos,0,0);
        for (let i = 0; i < this.sprites.length; i++) {
            this.sprites[i].show();
        }
        pop();
    }
    
    update() {
        for (let i = 0; i < this.sprites.length; i++) {
            this.sprites[i].position += this.step;
            if (this.sprites[i].position > 100) {
                this.sprites.splice(0,1);
            }
        }
        if (this.sprites.length < 4) {
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
    }
    
    show() {
        print("Printing sprite " + this.image + " Position: " + this.position);
        
        image(this.image, 0, this.position, 0);
    }
}