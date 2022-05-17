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