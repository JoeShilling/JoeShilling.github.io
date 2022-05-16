


let herbages = [];
let preys = [];
let predators = [];



function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    frameRate(120);
    

    let unit = windowWidth/10;
    for (let x = unit*2; x <= windowWidth - 400; x += unit) {
        for (let y = unit*2; y <= windowHeight - 400; y += unit) {
            herbages.push(new herbage(x, y, 120));
        }
    }
    
    herbages.push(new herbage (200,200));
    herbages.push(new herbage (400,600));
    herbages.push(new herbage (800,100));
    
    preys.push(new prey (50,50));
    preys.push(new prey (900,900));
    
    predators.push(new predator(600,600));
    predators.push(new predator(800,600));
    
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
    
    for (let i = 0; i < predators.length; i++) {
        if (predators[i].isDead()) {
            predators.splice(i,1);
        } else {
            predators[i].update();
            predators[i].show();
        }
    }
    
}

class animal {
    isDead() {
        if (this.hunger <= 0) {
            return (true);
        } else {
            return (false);
        }
    }
}

class predator extends animal {
    constructor(x, y) {
        super(x, y);
        this.pos = createVector(x, y);
        this.speed = 0.4;
        this.hunger = 100;
    }
    
    update() {
        
        if (this.hunger > 0) {
            this.hunger -= 0.12;
        }
        
        if (this.hunger <= 0) {
            console.log('predator died');
        } else {
            
            let direction = createVector(0,0);
            let distance = 10000000000000000;
            
            for (let prey of preys) {
                if (prey.isDead() == false) {

                    if (this.pos.dist(prey.pos) < distance) {
                        distance  = this.pos.dist(prey.pos);
                        direction = p5.Vector.sub(prey.pos,  this.pos);

                        if (direction.mag() > 1) { //so this probably shouldnt be here but we access to which prey the predator is touching
                            direction.normalize();
                            direction.mult(this.speed);

                        } else {
                            this.hunger += 25;
                            prey.hunger = 0;
                        }
                    }
                }

                this.pos.add(direction);
            }
            
        }   
    
    }
    
    show() {
        push();
        rectMode(RADIUS);
        colorMode(HSB)
        
        let colour = color(20, this.hunger, 70);

        fill(colour);
        translate(this.pos.x, this.pos.y);
        rotate(PI/4);
        translate(-this.pos.x, -this.pos.y);
        rect(this.pos.x, this.pos.y, 19);
        pop();
    }
    
}


class prey extends animal {
    constructor(x, y) {
        super(x, y);
        this.pos = createVector(x,y);
        this.speed = 2;
        this.hunger = 70; //when reaches 0 it dies, rip
    }
    
    update() {
        
        if (this.hunger >= 100) {
            preys.push(new prey(this.pos.x, this.pos.y));
            this.hunger -= 30;
        }
        
        if (this.hunger > 0) {
            this.hunger -= 0.2;
        }
        
        if (this.hunger <= 0) {
            console.log('prey died');
        } else {
            let Hdirection = createVector(0,0);
            
            let Pdirection = createVector(0,0);
            
            let distance = 10000000000000000;

            
            for (let predator of predators) {
                if (this.pos.dist(predator.pos) <= 100) {
                    let v = createVector(0,0);
                    v.add(p5.Vector.normalize(p5.Vector.sub(this.pos, predator.pos)));
                    v.mult(((100 - this.pos.dist(predator.pos))-1) / 100)
                    Pdirection.add(v.mult(this.speed) );
                      
                }
            }

            //moving towards herbs
            for (let herb of herbages) {
                if (herb.growth >= 1) {
                    if (this.pos.dist(herb.pos) < distance) {
                        distance  = this.pos.dist(herb.pos);
                        Hdirection = p5.Vector.sub(herb.pos,  this.pos)

                        if (Hdirection.mag() > 2.5) { //so this probably shouldnt be here but we access to which herb the prey is touching
                            Hdirection.normalize();
                            Hdirection.mult(this.speed);

                        } else {
                            this.hunger += 55;
                            herb.growth = 0;
                        }


                    }
                }

            }


            

            
            this.pos.add(Pdirection);
            this.pos.add(Hdirection);
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
        this.regrowTime = 500; //frames required to regrow
        this.growth = 1; //shows state of growth
    }
    
    update() {
        if (this.growth < 1) {
            this.growth += 1 / this.regrowTime;
        }
    }
    
    show() {
        
        colorMode(HSB)
        let colour = color(72, this.growth, 63);
        
        
        fill('#32a852');
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.growth * 20);
    }
    
}

