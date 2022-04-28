const morse = {
    'a' : '01',
    'b' : '1000',
    'c' : '1010',
    'd' : '100',
    'e' : '0',
    'f' : '00',
    'g' : '110',
    'h' : '0000',
    'i' : '00',
    'j' : '0111',
    'k' : '101',
    'l' : '0100',
    'm' : '11',
    'n' : '10',
    'o' : '111',
    'p' : '0110',
    'q' : '1101',
    'r' : '010',
    's' : '000',
    't' : '1',
    'u' : '001',
    'v' : '0001',
    'w' : '011',
    'x' : '1001',
    'y' : '1011',
    'z' : '1100'
}

let inp, button;

function setup() {
  // put setup code here
    
    createCanvas(windowWidth, windowHeight);
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
    console.log(inp.value());
    
    var text = inp.value();
    var converted = [];
    
    for (let letter in text) {
        converted.push(morse[text[letter]]);
    }
    
    console.log(converted);
    
}