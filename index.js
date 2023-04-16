//1 ich definiere alle Tasten
let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

//2 das Ereignis 
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up:"touchend"
    },
};
//3 Gerätetyp (kein Anfangswert)
let deviceType="";
let draw=false;
let erase=false;

//4 Wie wähle ich den Ereignis aus? ich kontroliere
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");//Ich erstelle ein neues Leere Ereignis
        deviceType="touch";//tu ich "touch" rein
    } catch(e) {
        deviceType="mouse";//falls nicht "mouse" kommt rein
        return false; // es gibt leer zurück
    }
};
isTouchDevice(); 

//5 wenn ich auf gridButton klicke
gridButton.addEventListener("click", () => {
    container.innerHTML="";
    let count=0;
    //erst für height
    for(let i=0;i<gridHeight.value; i++) {
        count +=2;
        let div=document.createElement("div");//Element erstellen
        div.classList.add("gridRow");

        //für width
        for(let j=0;j<gridWidth.value;j++) {
            count +=2;
            let col=document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id",`gridCol${count}`);//Einstellung
            //down
            col.addEventListener(events[deviceType].down, () => {
                draw=true;
                if(erase) {
                    col.style.backgroundColor="transparent";
                }else {
                    col.style.backgroundColor=colorButton.value;
                }
            });

            //move
            col.addEventListener(events[deviceType].move, (e) => {
                //navigation für move
                let elementId=document.elementFromPoint(
                    !isTouchDevice() ? e.clientX :e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY :e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            //up
            col.addEventListener(events[deviceType].up, () => {
                draw=false;
            });

            // col => div
            div.appendChild(col);
        }

        //div => container
        container.appendChild(div);
    }
});

//6 checker für move
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
    erase = true;
});

paintBtn.addEventListener("click", () => {
    erase = false;
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload =() => {
    gridHeight.value=0;
    gridWidth.value=0;
};
