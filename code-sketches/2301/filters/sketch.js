window.onload = () => {
    let canvas = new fabric.Canvas("duo", {selectable: false});
    let image = document.getElementById("source");
    let fabricImage = new fabric.Image(image, {selectable: false});
    canvas.selection = false;
    canvas.setDimensions({width:fabricImage.width, height:fabricImage.height});



    canvas.add(fabricImage);

    let grey = new fabric.Image.filters.Grayscale();


    let bgFilter = new fabric.Image.filters.Blend({
        color: "#1c6a81",
        mode: 'lighten'
    })

    let fgFilter = new fabric.Image.filters.Blend({
        color: "#c97eaa",
        mode: 'multiply'
    })

    fabricImage.filters.push(grey);
    fabricImage.filters.push(bgFilter);
    fabricImage.filters.push(fgFilter);
    fabricImage.applyFilters(canvas.renderAll.bind(canvas));
}





let download = () => {
    console.log("download");
};