
function drawTourist() { //have to be called by a Pattern object // this defines the actual shape
    noStroke();
    fill(this.colours[0]);
    rect(this.x, this.y, this.width, this.height);
    fill(this.colours[1]);
    
    rect(this.x,this.y, this.width, this.height * 0.1);
    rect(this.x, this.y + this.height*0.9,this.width, this.height*0.1);
    rect(this.x, this.y + this.height*0.4, this.width, this.height * 0.2);
    
    fill(this.colours[2]);
    rect(this.x,this.y, this.width * 0.1, this.height * 0.6);
    rect(this.x  + this.width*0.9 ,this.y, this.width * 0.1, this.height * 0.6);
    rect(this.x + this.width * 0.4 ,this.y + this.width*0.4, this.width * 0.2, this.height * 0.6);

}