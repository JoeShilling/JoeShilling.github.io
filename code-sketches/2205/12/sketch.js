


let herbages = [];
let preys = [];
let predators = [];

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    frameRate(30);
    for (let x = windowWidth/12; x < windowWidth; x += windowWidth/4) {
        for (let y = windowHeight/12; x < windowHeight; y += windowWidth/4) {
            herbages.push(new herbage(x, y, 120));
        }
    }
    
}

function draw() {
    for (let herb in herbages) {
        herb.show();
    }
}

class predator {
    constructor() {}
}

class prey {
    constructor() {}
}

class herbage {
    constructor (x, y, regrowTime) { //xy is position, regrow is number of frames required to regrow
        this.x = x;
        this.y = y;
        this.regrowTime = regrowTime;
        this.growth = 1; //shows state of growth
    }
    
    update () {
        if (this.growth < 1) {
            this.growth += 1 / this.regrowTime;
        }
    }
    
    show () {
        fill('#32a852');
        ellipse(this.x, this.y, this.growth * 30);
    }
    
}