const morse = {
    'a' : [2,1],
    'b' : [1,2,2,2],
    'c' : [1,2,1,2],
    'd' : [1,2,2],
    'e' : [2],
    'f' : [2,2],
    'g' : [1,1,2],
    'h' : [2,2,2,2],
    'i' : [2,2],
    'j' : [2,1,1,1],
    'k' : [1,2,1],
    'l' : [2,1,2,2],
    'm' : [1,1],
    'n' : [1,2],
    'o' : [1,1,1],
    'p' : [2,1,1,2],
    'q' : [1,1,2,1],
    'r' : [2,1,2],
    's' : [2,2,2],
    't' : [1],
    'u' : [2,2,1],
    'v' : [2,2,2,1],
    'w' : [2,1,1],
    'x' : [1,2,2,1],
    'y' : [1,2,1,1],
    'z' : [1,1,2,2]
}


let morseSounds = {};

let inp, button, testPart, cnv;
let penSound,coffeeSound,dryerSound,mouseSound;

function preload() {
    soundFormats('mp3');
    
    penSound = loadSound('sounds/pen');
    coffeeSound = loadSound('sounds/coffee');
    dryerSound = loadSound('sounds/dryer');
    mouseSound = loadSound('sounds/mouse');
    
}

function setup() {
  // put setup code here
    let m1 = [1,1,1];
    let m2 = [2,2,2];
    let m3 = [1,1,1,2,2,2,1,1,1];
    
    let S = new p5.Phrase('morseS', mStep, m1);
    let O = new p5.Phrase('morseO', mStep, m2);
    let SOS = new p5.Phrase('morseSOS', mStep, m3);
    
    testPart = new p5.Part();
    
    testPart.addPhrase(SOS);
    testPart.setBPM(24);
    
    cnv = createCanvas(windowWidth, windowHeight);
    //cnv.mousePressed(playPart);
    
    inp = createInput('');
    inp.position(20,20);
    inp.size(100);
    
    button = createButton('Speak');
    button.position(120,20);
    button.mousePressed(convertMorse);    
}

function draw() {
  // put drawing code here
}


function convertMorse() {
    userStartAudio();
    console.log(inp.value());
    
    var text = inp.value();
    let converted = [];
    
    for (let letter in text) {
        console.log(morse[text[letter]]);
        converted = converted.concat(morse[text[letter]]);
    }
    
    console.log(converted);
    
    let morsePattern = new p5.Phrase('morse pattern', mStep, converted);
    let morsePart = new p5.Part();
    morsePart.addPhrase(morsePattern);
    morsePart.setBPM(14);
    morsePart.start();
    
    
}


function mStep(time, sound) {
    switch (sound) { //2 is 0 because 0 is not passed to the function for whatever reason
        case 2:

            dryerSound.play();
            break;
        case 1:

            coffeeSound.play();
            break;
        default:
            console.log('-');
    }
}

function playPart() {
    console.log("doing something");
    userStartAudio();
    testPart.start();
}
