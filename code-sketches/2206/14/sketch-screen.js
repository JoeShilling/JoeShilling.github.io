const screen = ( p ) => {
    let cnv;
    let x;
    let y;
    p.setup = () => {
        cnv = p.createCanvas(595,595);
        x = 700;
        y = 700;
    }
    p.draw = () => {
        p.ellipse(x,y,10);
        x += p.random(-15,15);
        y += p.random(-15,15);
    }
    
}