


let herbages = [];
let preys = [];
let predators = [];
let backgroundC = 'white';


function setup() {
    cnv = createCanvas(1000, 1000);
    frameRate(60);
    
    push();
    noFill();
    strokeWeight(8);
    rect(0,0, 1000, 1000);
    pop();
    
    let unit = windowWidth/12;

    for (let x = unit*2; x <= windowWidth - 100; x += unit) {
        for (let y = unit*2; y <= windowHeight - 100; y += unit) {
            herbages.push(new herbage(x, y, 120));
        }
    }
    
    //preys.push(new prey (50,50));
    preys.push(new prey (-10, 200));
    preys.push(new prey (-10, 400));
    preys.push(new prey (-10, 600));
    
    //predators.push(new predator(600,600));
    //predators.push(new predator(800,600));
    
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
        this.speed = 0.3;
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
                console.log('Predator direction - ' + direction.mag());
                this.pos.add(direction);
            }
            
        }   
    
    }
    
    show() {
        push();
        
        colorMode(HSB)
        rectMode(CORNER);
        
        let colour = color(20, this.hunger, 70);

        fill(colour);
        
        let size = 200;
        
        push();
        //rotateAroundPoint(this.pos.x + 20, this.pos.y + 20, PI);
        fill(colour);
        rect(this.pos.x + 20, this.pos.y + 20, size);
        fill('black');
        ellipse(this.pos.x + 20, this.pos.y + 20, 5);
        pop();
        
        fill(colour);
        push();
        rotateAroundPoint(this.pos.x + 20, this.pos.y - 20, -PI/2);
        rect(this.pos.x + 20, this.pos.y - 20, size);
        fill('black');
        ellipse(this.pos.x + 20, this.pos.y - 20, 5);
        
        pop();
        
        fill(colour);
        push();
        rotateAroundPoint(this.pos.x - 20, this.pos.y - 20, PI);
        rect(this.pos.x - 20, this.pos.y - 20, size);
        fill('black');
        ellipse(this.pos.x - 20, this.pos.y - 20, 5);
        pop();
        
        fill(colour);
        push();
        rotateAroundPoint(this.pos.x - 20, this.pos.y + 20, PI/2);
        rect(this.pos.x - 20, this.pos.y + 20, size);
        fill('black');
        ellipse(this.pos.x - 20, this.pos.y + 20, 5);
        pop();
        
        
        pop();
    }
    
}


class prey extends animal {
    constructor(x, y) {
        super(x, y);
        this.pos = createVector(x,y);
        this.speed = 2;
        this.hunger = 70; //when reaches 0 it dies, rip
        this.heading;
        this.headingTowards;
    }
    
    update() {
        
        /*
        if (this.hunger >= 150) {
            preys.push(new prey(this.pos.x, this.pos.y));
            this.hunger -= 30;
        } */
        
        if (this.hunger > 0) {
            this.hunger -= 0.01;
        }
        
        if (this.hunger <= 0) {
            console.log('prey died');
        } else {
            let direction = createVector(0,0);

            
            let distance = 10000000000000000;


            //moving towards herbs
            
            if (herbages.length > 0) {
                for (let herb of herbages) {
                    if (herb.growth >= 1) {
                        if (this.pos.dist(herb.pos) < distance) {

                            distance  = this.pos.dist(herb.pos);
                            direction = p5.Vector.sub(herb.pos,  this.pos)
                            this.headingTowards = herb;

                            print(herb.pos);

                            if (direction.mag() > 2.5) { //so this probably shouldnt be here but we need access to which herb the prey is touching
                                /*
                                direction.normalize();
                                direction.mult(this.speed); */

                            } else {
                                this.hunger += 55;
                                herb.growth = 0;
                            }
                        }
                    }

                }


                if (this.heading == null) {
                    direction.normalize();
                    this.heading = createVector(direction.x, direction.y);

                }



                let turn = PI / 36;
                
                print("Prey heading: " + this.heading.heading() + " Direction heading: " + direction.heading());
                
                if (this.heading.angleBetween(direction) < 0) {
                    this.heading.rotate(-turn); 
                } else if (this.heading.angleBetween(direction) > 0) {
                    this.heading.rotate(turn); 
                }
                
                
                /*
                if (this.heading.heading() < direction.heading()) {
                    this.heading.rotate(turn);
                } else if (this.heading.heading() > direction.heading()) {
                    this.heading.rotate(-turn);       
                } */


                this.pos.add(this.heading) ;
                
                
                
            } else {
                this.heading == null
            }

        }
        

        
    }
    
    show() {
        rectMode(RADIUS);
        colorMode(HSB)
        let colour = color(200, this.hunger, 80);
        let pointSize = 2;
        let ropeWidth = 30;
        
        
        push()
        fill('black');
        rotateAroundPoint(this.pos.x, this.pos.y , this.heading.heading() + PI/2);
        
        
        
        if (this.hunger > 0) {
            ellipse(this.pos.x - (ropeWidth/2) + ((frameCount + (ropeWidth/3)) % ropeWidth), this.pos.y, pointSize); //centre strand
        } if (this.hunger > 10) {
            ellipse(this.pos.x - (ropeWidth/2) + (frameCount % ropeWidth), this.pos.y, pointSize); //left strand
        } if (this.hunger > 20) {
            ellipse(this.pos.x - (ropeWidth/2) + ((frameCount + (ropeWidth/3)*2) % ropeWidth), this.pos.y, pointSize); //right strand     
        }
        
        if (this.hunger > 30) {
            ellipse(this.pos.x - (ropeWidth/2), this.pos.y, pointSize);
            ellipse(this.pos.x + (ropeWidth/2), this.pos.y, pointSize); 
        } else { //fraying rope as its about to die
            let i = Math.round((this.hunger / 30) * 10);
            if (frameCount % i != 0) {
                ellipse(this.pos.x - (ropeWidth/2), this.pos.y, pointSize);
                ellipse(this.pos.x + (ropeWidth/2), this.pos.y, pointSize);
            } 
        }
        
        
        
        pop();
        //fill(colour);
        //rect(this.pos.x, this.pos.y, 15);
    }
}

class herbage {
    constructor (x, y) { //xy is position, regrow is number of frames required to regrow
        this.pos = createVector(x,y);
        this.regrowTime = 1000; //frames required to regrow
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
        
        //fill(backgroundC);
        //ellipse(this.pos.x, this.pos.y, 22);
        
        fill('black');
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.growth * 20);
    }
    
}

