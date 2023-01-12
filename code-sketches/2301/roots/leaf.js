class Leaf {
  constructor() {
    this.pos = createVector(random(width), random(100, height));
    this.active = true;
  }

  show() {
    console.log("hello");
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }
}