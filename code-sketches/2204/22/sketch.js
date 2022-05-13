let slider;
let sigil1;
let playing = false;
let synth;



function setup() {
    cnv  = createCanvas(500,500);
    cnv.doubleClicked(switchPlaying);
    frameRate(1);
    slider = createSlider(0, 510, 100);
    slider.position(10, 10);
    slider.style('width', '80px');
    
    sigil1 = new sigilLayer(200,200, 100, 5);
    synth = new Tone.Synth().toDestination();
}

function draw() {
    synth.triggerAttackRelease(slider.value(), Tone.now());
}


function switchPlaying() {
    if (playing) {
        playing = false;
        Tone.Transport.start();
    } else {
        playing = true;
        Tone.Transport.stop();
    }
}

    