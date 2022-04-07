function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function getRndColour() {
    return color(getRndInteger(0,256),getRndInteger(0,256),getRndInteger(0,256));
}