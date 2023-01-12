let canvas, grey, contrast, bgFilter, fgFilter, altFgFilter;

class Tile {
    constructor (image, canvas,left, top, width, height) {
        this.image = image;
        this.canvas = canvas;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        let i = new Image();
        i.src = this.image.toDataURL({ //get the crop
            width: this.width,
            height: this.height,
            left: this.left,
            top: this.top
        });
        this.output = new fabric.Image(i, { //position the crop correctly back on the canvas
            top: this.top,
            left: this.left
        });

        this.output.clone((clo) => {
            clo.clipPath = new fabric.Text("LO\n  AM", {
                fontSize: 115,
                lineHeight: 0.4,
                left: -0.5 * clo.width,
                top: -0.5 * clo.height
            });

            clo.filters.push(new fabric.Image.filters.Grayscale());
            clo.filters.push(altFgFilter);
            clo.applyFilters();
            canvas.add(clo);

        })

        this.output.filters.push(colourRemove);
        this.output.filters.push(contrast);
        this.output.filters.push(grey);
        this.output.filters.push(bgFilter);
        this.output.filters.push(fgFilter);
        this.output.applyFilters();

        this.canvas.add(this.output);
    }
}

window.onload = () => {
    canvas = new fabric.Canvas("duo", {selectable: false});
    let image = document.getElementById("source");
    let fabricImage = new fabric.Image(image, {selectable: false});
    canvas.selection = false;
    canvas.setDimensions({width:fabricImage.width, height:fabricImage.height});



    canvas.add(fabricImage);


    let grey = new fabric.Image.filters.Grayscale();
    let contrast = new fabric.Image.filters.Contrast({
        contrast: 0.1
    })

    bgFilter = new fabric.Image.filters.BlendColor({
        color: "#15af29",
        mode: 'lighten'
    })

    fgFilter = new fabric.Image.filters.BlendColor({
        color: "#c97eaa",
        mode: 'multiply'
    })

    altFgFilter = new fabric.Image.filters.BlendColor({
        color: "#d6556d",
        mode: 'multiply'
    })

    colourRemove = new fabric.Image.filters.BlendColor({
        color: "#b9553c",
        distance: 20
    })

    // fabricImage.clone((clo) => {
    //     clo.set('selectable', false);
    //     clo.clipPath = new fabric.Text("CA", {
    //         fontSize: 400,
    //         left: -0.5 * clo.width,
    //         top: -0.0 * clo.height
    //     });
    //     clo.filters.push(contrast);
    //     clo.filters.push(grey);
    //     clo.filters.push(bgFilter);
    //     clo.filters.push(altFgFilter);

    //     clo.applyFilters();
    //     canvas.add(clo)
    // })

    // fabricImage.filters.push(colourRemove);
    // fabricImage.filters.push(contrast);
    // fabricImage.filters.push(grey);
    // fabricImage.filters.push(bgFilter);
    // fabricImage.filters.push(fgFilter);
    // fabricImage.applyFilters();

    tileImage(fabricImage, canvas);
   
}

let tileImage = (image, canvas) => {
    let rows = 8;
    let columns = 8;
    let tWidth = image.width / columns;
    let tHeight = image.height / rows;
    let tiles = [];
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y< rows; y++) {
            console.log(image);
            tiles.push(new Tile(image, canvas, (x * tWidth), (y * tHeight), tWidth, tHeight));
        }
    }
    console.log(tiles);
    canvas.renderAll();
}



let updateColors = () => {
    bgFilter.color = document.getElementById('background').value;
    fgFilter.color = document.getElementById('foreground').value;
    altFgFilter.color = document.getElementById('mask').value;
    canvas._objects.forEach(element => {
        element.applyFilters();
    });
    canvas.renderAll();
}


let download = () => {
    let  content = canvas.toDataURL({
        multiplier: 3
    });
    saveAs(content, 'toad.png', 2)
};