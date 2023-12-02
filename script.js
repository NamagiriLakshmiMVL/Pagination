const contDiv = document.createElement("div")
contDiv.className = "container"
document.body.appendChild(contDiv)

const headDiv = document.createElement("h1")
headDiv.id = "title";
headDiv.innerText = "PAGINATION";
headDiv.className = "text-center"
contDiv.appendChild(headDiv)

const pDiv = document.createElement("p")
pDiv.id = "description"
pDiv.innerText = "Change values to see difference"
contDiv.appendChild(pDiv)

const newDiv = document.createElement("div")
newDiv.className = "table-responsive"
contDiv.appendChild(newDiv)

const firstDiv = document.createElement("div");
firstDiv.className = "input-group-mb-3";
contDiv.appendChild(firstDiv)

let currentPage = 1
const data = mainObj

const secondDiv = document.createElement("div");
secondDiv.className = "input-group-prepend";
firstDiv.appendChild(secondDiv)

const labName = document.createElement("label")
labName.className = "input-group-text";
labName.setAttribute("for", "inputGroupSelect01")
labName.innerText = "Values per Page";
secondDiv.appendChild(labName)

const selectvar = document.createElement("select");
selectvar.id = "num";
selectvar.className = "custom-select";
selectvar.setAttribute("name", "numOfEle");
selectvar.setAttribute("onchange", "mainDriverFunc()");
labName.appendChild(selectvar)

let newFunction = (val) => {
    let elem = document.createElement("option")
    elem.setAttribute("value", val)
    elem.innerText = val
    selectvar.appendChild(elem)
}
let option1 = newFunction("10");
let option2 = newFunction("20");
let option3 = newFunction("25");
let option4 = newFunction("50");

let rootDiv = document.createElement("div");
rootDiv.className = "root";
secondDiv.append(rootDiv);


function chunk(arr, split) {
    return arr.reduce((accum, val, ind) => {
        if (ind % split == 0) {
            accum.push([val]);
        }
        else {
            accum[accum.length - 1].push(val);
        }
        return accum;
    }, []);
}

const updateTable = (table, pageNum) => {

    const size = getSize();
    const chunkedData = chunk(data, size)

    table.innerHTML =
        chunkedData[pageNum].map((val) => {
            return `<tr>
        <td>${val.id}</td>
        <td>${val.name}</td>
        <td>${val.email}</td>
        </tr>`
        })
}
const changePage = (page) => {
    currentPage = Number(page)
    updateTable(document.getElementById("mainTable"), currentPage)
}

const createPageButtons = (numOfPages) => {
    const mainDiv = document.createElement("div")
    mainDiv.id = "buttons"
    mainDiv.className = "d-flex justify-content-center"
    for (let i = 0; i < numOfPages; i++) {
        let button = document.createElement("button");
        button.id = i;
        button.innerText = i + 1;
        button.addEventListener("click", (event) => {
            changePage(event.target.id)
        })
        mainDiv.appendChild(button)
    }
    return mainDiv
}
const getSize = () => {
    return selectvar.value
}
const mainDriverFunc = () => {
    rootDiv.innerHTML = ""
    const size = getSize();
    const chunkedData = chunk(data, size)
    console.log(chunkedData)
    const buttons = createPageButtons(chunkedData.length)
    const mainTable = document.createElement("table")
    mainTable.className = "table table-bordered";
    mainTable.className="table"
    mainTable.id = "mainTable";
    rootDiv.append(mainTable);




    changePage(0);
    rootDiv.append(buttons)
    const theadElem = document.createElement("thead")
    mainTable.appendChild(theadElem)

    const trow = document.createElement("tr")
    trow.className="tablecont"
    theadElem.appendChild(trow)

    const thead = document.createElement("th")
    thead.innerHTML = "ID"
    trow.className="tablecont"
    trow.appendChild(thead)

    const thead2 = document.createElement("th")
    thead2.innerHTML = "NAME"
    trow.className="tablecont"
    trow.appendChild(thead2)

    const thead3 = document.createElement("th")
    thead3.innerHTML = "E-MAIL"
    trow.className="tablecont"
    trow.appendChild(thead3)

}


window.onload = mainDriverFunc();



