let canvas, bgFilter, fgFilter, altFgFilter;
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

    fabricImage.clone((clo) => {
        clo.set('selectable', false);
        clo.clipPath = new fabric.Text("CA", {
            fontSize: 400,
            left: -0.5 * clo.width,
            top: -0.0 * clo.height
        });
        clo.filters.push(contrast);
        clo.filters.push(grey);
        clo.filters.push(bgFilter);
        clo.filters.push(altFgFilter);

        clo.applyFilters();
        canvas.add(clo)
    })

    fabricImage.filters.push(colourRemove);
    fabricImage.filters.push(contrast);
    fabricImage.filters.push(grey);
    fabricImage.filters.push(bgFilter);
    fabricImage.filters.push(fgFilter);
    fabricImage.applyFilters();
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
    let  content = canvas.toDataURL();
    saveAs(content, 'toad.png')
};