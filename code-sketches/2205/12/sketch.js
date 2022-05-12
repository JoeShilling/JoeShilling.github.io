


let herbages = [];
let preys = [];
let predators = [];



function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    frameRate(120);
    

    let unit = windowWidth/12;
    for (let x = unit; x <= windowWidth; x += unit) {
        for (let y = unit; y <= windowHeight; y += unit) {
            herbages.push(new herbage(x, y, 120));
        }
    }
    
    herbages.push(new herbage (200,200));
    herbages.push(new herbage (400,600));
    herbages.push(new herbage (800,100));
    
    preys.push(new prey (50,50));
    preys.push(new prey (900,900));
}

function draw() {
    //background('white');
    
    for (let herb of herbages) {
        herb.update();
        herb.show();
    }
    

    for (let i = 0; i < preys.length; i++) {
        if (preys[i].isDead()) {
            preys.splice(i,1);
        } else {
            preys[i].update();
            preys[i].show();
        }
    }
    /*
    for (let prey of preys) {

    }
    */
}


class predator {
    constructor() {}
}


class prey {
    constructor(x, y) {
        this.pos = createVector(x,y);
        this.speed = 2;
        this.hunger = 50; //when reaches 0 it dies, rip
    }
    
    isDead() {
        if (this.hunger <= 0) {
            return (true);
        } else {
            return (false);
        }
    }
    
    update() {
        
        if (this.hunger >= 109) {
            preys.push(new prey(this.pos.x, this.pos.y));
            this.hunger = 70;
        }
        
        if (this.hunger > 0) {
            this.hunger -= 0.3;
        }
        
        if (this.hunger <= 0) {
            console.log('dead');
        } else {
            let direction = createVector(0,0);
            let distance = 10000000000000000;



            //moving towards herbs
            for (let herb of herbages) {
                if (herb.growth >= 1) {
                    if (this.pos.dist(herb.pos) < distance) {
                        distance  = this.pos.dist(herb.pos);
                        direction = p5.Vector.sub(herb.pos,  this.pos)

                        if (direction.mag() > 1.5) { //so this probably shouldnt be here but we access to which herb the prey is touching
                            direction.normalize();
                            direction.mult(this.speed);

                        } else {
                            this.hunger += 25;
                            herb.growth = 0;
                        }


                    }
                }

            }





            this.pos.add(direction);
        }
        

        
    }
    
    show() {
        rectMode(RADIUS);
        colorMode(HSB)
        let colour = color(200, this.hunger, 80);

        fill(colour);
        rect(this.pos.x, this.pos.y, 15);
    }
}

class herbage {
    constructor (x, y) { //xy is position, regrow is number of frames required to regrow
        this.pos = createVector(x,y);
        this.regrowTime = 1500; //frames required to regrow
        this.growth = 1; //shows state of growth
    }
    
    update() {
        if (this.growth < 1) {
            this.growth += 1 / this.regrowTime;
        }
    }
    
    show() {
        fill('#32a852');
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.growth * 20);
    }
    
}

