//output functions

//output view ()
let currentWork;
const outputView = (element) => {
    currentWork = document.querySelector("#output_root");
    const clone = element.querySelector(".output_root").cloneNode(true);
    clone.setAttribute("id", "output_root");
    currentWork.removeAttribute("id");
    currentWork.replaceWith(clone);
    document.querySelector("#output_save").classList.add('hidden');
    document.querySelector("#output_clear").classList.add('hidden');
    document.querySelector("#output_exit").classList.remove('hidden');
}

//output clear
document.querySelector('#output_clear').addEventListener('click', (e) => {
    document.querySelector("#output_root").replaceChildren();
});


//output save
document.querySelector('#output_save').addEventListener('click', (e) => {
    let outputWrapper = document.createElement("div");
    outputWrapper.classList.add("gallery_element-wrapper"); 
    let output = document.querySelector("#output_root");
    output.removeAttribute('id');
    outputWrapper.append(output);

    let outputLabel = document.createElement("div");
    outputLabel.innerHTML = "<p>View</p>";
    outputLabel.classList.add("gallery_element-label");
    outputWrapper.append(outputLabel);     
    outputWrapper.addEventListener("click", (e) => {
        outputView(e.currentTarget);
    });
    document.querySelector("#gallery_wrapper").prepend(outputWrapper);
    
    
    let newRoot = document.createElement("div");
    newRoot.classList.add("output_root");
    newRoot.setAttribute("id", "output_root");
    document.querySelector(".grid-element.a").prepend(newRoot);
});

//output exit
document.querySelector('#output_exit').addEventListener('click', (e) => {
    currentView = document.querySelector("#output_root");
    currentWork.setAttribute("id", "output_root");
    currentView.removeAttribute("id");
    currentView.replaceWith(currentWork);
    document.querySelector("#output_save").classList.remove('hidden');
    document.querySelector("#output_clear").classList.remove('hidden');
    document.querySelector("#output_exit").classList.add('hidden');
});


//console functions

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

let pageHistory = [];

//browser functions start
const switchPages = (target) => {
    pageHistory.push(target);
    let allPages = document.querySelectorAll(".browser_page");
    allPages.forEach((e) => {
        e.classList.remove("is-active");
    })
    document.querySelector(`[page-name="${target}"]`).classList.add("is-active");
}


document.querySelectorAll("[page-link]").forEach((e) => {
    e.addEventListener("click", (event) => {
        switchPages(event.currentTarget.getAttribute('page-link'));
    });
})

document.querySelector("#browser-home").addEventListener("click", (event) => {
    switchPages('home');
})

document.querySelector("#browser-back").addEventListener("click", (event) => {
    if (pageHistory.length >= 2) {
        pageHistory.pop();
        switchPages(pageHistory.pop());
    }

})

switchPages("home");

//browser functions end

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

