let dragTarget = null;

document.querySelectorAll('.console_icon').forEach((i) => {
    i.addEventListener("dragstart", (event) => {
        dragTarget = event.target;
    });
});

const cl = document.querySelector('#command-line');
cl.addEventListener("dragover", (event) => {
    event.preventDefault();
});

cl.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.id == 'command-line') {
        console.log(dragTarget);
    }
    const c = dragTarget.cloneNode()
    c.setAttribute('draggable', false);
    c.addEventListener("click" , (event) => {
        let e = event.target;
        e.parentNode.removeChild(e);
    });
    event.target.appendChild(c);
});