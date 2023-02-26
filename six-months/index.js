//output clear
document.querySelector('#output_clear').addEventListener('click', (e) => {
    document.querySelector("#output_root").replaceChildren();
});


//add onClick listeners to each of the icons on the iconRow
document.querySelectorAll('.console_icon').forEach((i) => {
    i.addEventListener('click', (event) => {
        const c = event.target.cloneNode()
        c.setAttribute('draggable', false);
        c.addEventListener("click" , (event) => {
            let e = event.target;
            e.parentNode.removeChild(e);
        });
        document.querySelector('#command-line').appendChild(c);
    });
});

//console clear button
let consoleClear = () => {
    document.querySelectorAll(".console_command-line .console_icon").forEach((e) => {e.click()});
}
document.querySelector('#console-clear').addEventListener('click', consoleClear);

let consoleRun = () => {
    let inputList = [];
    
    document.querySelectorAll(".console_command-line .console_icon").forEach((e) => {
        inputList.push(e.getAttribute('console'));

    });
    console.log(inputList);

    let root = document.querySelector("#output_root");
    let current = root;
    let colour = "black";
    let child = null;

    root.replaceChildren();
    inputList.forEach((instruction) => {
        switch (instruction) {
            case "break":
                if (current.id != "output_root") {
                    current = current.parentElement;
                }
            break;
            case "p-grid":
                child = document.createElement("div");
                child.classList.add("output_p-grid");
                current.appendChild(child);
                current = child;
            break;
            case "p-layers":
                child = document.createElement("div");
                child.classList.add("output_p-layers");
                current.appendChild(child);
                current = child;
            break;
            case "p-columns":
                child = document.createElement("div");
                child.classList.add("output_p-columns");
                current.appendChild(child);
                current = child;
            break;
            case "s-block":
                child = document.createElement("div");
                child.classList.add("output_s-block");
                child.style.backgroundColor = colour;
                current.appendChild(child);
            break;
            case "s-circle":
                child = document.createElement("div");
                child.classList.add("output_s-block");
                child.style.backgroundColor = colour;
                current.appendChild(child);
            break;
            case "c-green":
                colour = "green";
            break;
            case "c-red":
                colour = "red";
            break;
        }
    });
    consoleClear();
}
document.querySelector('#console-run').addEventListener('click', consoleRun);


let keyPress = (event) => {
    switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            try {
                let x = parseInt(event.key) - 1;
                document.querySelectorAll(".console_icon-row .console_icon:not(.hidden)").item(x).click();
            } catch (TypeError) {
                console.warn('Not that many icons');
            }
            break;
        case '0':
            try {
                let x = 9
                document.querySelectorAll(".console_icon-row .console_icon:not(.hidden)").item(x).click();
            } catch (TypeError) {
                console.warn('Not that many icons');
            }
            break;
        case 'Backspace':
        case '`':
            try {
                let icons = document.querySelectorAll(".console_command-line .console_icon");

                icons.item(icons.length - 1).click()
            } catch (TypeError) {
                console.warn("Nothing to delete");
            }
            break;
        case 'Enter':
            document.querySelector("#console-run").click();
            break;
}

}

document.addEventListener('keyup', keyPress);

