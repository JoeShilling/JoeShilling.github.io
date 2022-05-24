function getRndInteger(min, max) { //inclusive exclusive
  return Math.floor(Math.random() * (max - min) ) + min;
}

function getRndColour(format='rgb') {
    
    switch (format) {
        case 'hsb':
            colorMode(HSB)
            return color(getRndInteger(0,360),getRndInteger(0,100),getRndInteger(0,100))
        case 'rgb':
        default:
            colorMode(RGB)
            return color(getRndInteger(0,256),getRndInteger(0,256),getRndInteger(0,256));
    }
    

}

function rotateAroundPoint(x , y, angle) {

    translate(x, y);
    rotate(angle);
    translate(-x,-y);

}

function getOppositeHue(hue) { //returns the hue on the opposite side of the colour wheel
    
    let temp = hue - 180;
    if (temp >= 0) {
        return (temp);
    } else {
        temp = temp ^ 2;
        temp = temp ^ 1/2;
        return (360 - temp);
    }
    
}

function getColourTriad(startColour, wiggle) { //wiggle is whether to get the exact triad or not
    let colours = [];
    colorMode(HSB);
    let s = saturation(startColour);
    let b = brightness(startColour);
    
    let temp = (hue(startColour) + 120) % 360;
    colours.push(color(temp, s, b));
    temp = (hue(startColour) + 240) % 360;
    colours.push(color(temp, s, b));
    
    return(colours);
}