class Tree {
  constructor() {
    this.leaves = [];
    this.branches = [];
    this.distance = 1;

    this.branches.push(new Branch(null, createVector(width/2, height)));
    for (let i =0; i < 200; i++) {
      this.leaves.push(new Leaf());
    }

  }

  grow() {

    for (let i = 0; i < this.branches.length; i++) {
      let adjacent = [];
      for (let j = 0; j < this.leaves.length; j++) {
        if ((p5.Vector.dist(this.branches[i], this.leaves[j]) < max_dist) && (this.leaves[j].active)) {
          adjacent.push(this.leaves[j]);
        }
      }

      for (let j = 0; j < adjacent.length; j++) {
        let d = p5.Vector.dist(this.branches[j], adjacent[j]);
        if (d < min_dist) {
          adjacent[j].active = false;
        }

        this.branches[i].direction += (p5.Vector.normalize(d) * this.distance);
      }

    }



  }

  show() {
    for (let i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show();
    }

    for (let i = 0; i < this.branches.length; i++) {
      this.branches[i].show();
    }

  };
}