window.onload = () => {
    let canvas = new fabric.Canvas("duo", {selectable: false});
    let image = document.getElementById("source");
    let fabricImage = new fabric.Image(image, {selectable: false});
    canvas.selection = false;
    canvas.setDimensions({width:fabricImage.width, height:fabricImage.height});



    canvas.add(fabricImage);

    let grey = new fabric.Image.filters.Grayscale();
    let contrast = new fabric.Image.filters.Contrast({
        contrast: 0.1
    })

    let bgFilter = new fabric.Image.filters.BlendColor({
        color: "#1c6a81",
        mode: 'lighten'
    })

    let fgFilter = new fabric.Image.filters.BlendColor({
        color: "#c97eaa",
        mode: 'multiply'
    })

    fabricImage.clone((clo) => {
        clo.clipPath = new fabric.Text("CA", {
            fontSize: 100,
            left:-100,
            top: -100
        });
        clo.filters.push(bgFilter);
        clo.applyFilters();
        canvas.add(clo)
    })



    fabricImage.filters.push(contrast);
    fabricImage.filters.push(grey);
    fabricImage.filters.push(bgFilter);
    fabricImage.filters.push(fgFilter);
    fabricImage.applyFilters();
}





let download = () => {
    console.log("download");
};