class Branch {
  constructor (parent) {
    if (parent != null) {
      this.parent = parent;
      this.pos = parent.pos + parent.direction;
      this.direction = parent.direction;
    } else {
      this.pos = createVector(width/2, 0);
      this.direction = createVector(0, 1);
      this.parent = parent;
    }
  }

  show () {
    fill('green');
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }

}