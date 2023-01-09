const p = '#595959'; //primary
const s = '#808f85'; //seconday
const a = '#91C499'; //accent
let source = document.getElementById('source');
let originalImage = new fabric.Image(source);

let output = new fabric.Canvas('output', {selection: false});
output.width = originalImage.width;
output.height = originalImage.height;
console.log('help');

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


const rows = 7;
const columns = 7;
let tiles = [];
let tileWidth = originalImage.width / columns;
let tileHeight = originalImage.height / rows;



for (let x = 0;  x < columns; x++) {
    for (let y = 0; y < rows;  y++) {
        
        let tile = new Image();
        tile.src = originalImage.toDataURL({
            width: tileWidth,
            height: tileHeight,
            left: x * tileWidth,
            top: y * tileHeight
        });
        
        tiles.push(new fabric.Image(tile));
    }
}

tiles = shuffle(tiles);
let count = 0;
for (let x = 0;  x < columns; x++) {
    for (let y = 0; y < rows;  y++) {
        tiles[count].top = (y * tileHeight);
        tiles[count].left = (x * tileWidth);
        output.add(tiles[count]);
        count++;
    }
}
output.renderAll();

console.log(tiles);