let lastId = 0;
let arrWithObj = []


let outputContainer = document.getElementById('name-value-list');
let inputForm = document.getElementById('user-inputs');
let userInput = document.getElementById('name-value');
let nameValueInput = document.getElementsByClassName('name-value-input')[0];
let addBtn = document.getElementById('add-button');
let sortByNameBtn = document.getElementById('sort-by-names');
let sortByValueBtn = document.getElementById('sort-by-values');
let deleteBtn = document.getElementById('delete');
let cleanBtn = document.getElementById('clean-all');


let errorMsg = document.createElement('p');
errorMsg.classList.add('error');
nameValueInput.appendChild(errorMsg);


function checkInput(input) {

    if (!input.match(/^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/g)) {
        errorMsg.innerText = 'Please print name=value !'
        addBtn.disabled = true

    } else {
        errorMsg.innerText = '';
        addBtn.disabled = false;
    }

}

function showList(array) {
    outputContainer.innerText = '';

    array.forEach(elem => {

        let listElem = document.createElement('div');
        listElem.classList.add('listElem');
        listElem.setAttribute('id', elem.id);

        listElem.onclick = function () {
            selected(listElem.id);
        };

        if (elem.selected === true) {
            listElem.classList.add('selected');
        }

        const [key, value] = Object.entries(elem)[0];


        let textElem = document.createElement('p');

        textElem.innerText = `${key}=${value}`;

        listElem.appendChild(textElem);


        outputContainer.appendChild(listElem);
    })

}

function selected(id) {
    console.log(id);
    arrWithObj.forEach((el) => {
        if (el.id === Number(id)) {
            el.selected = !el.selected;
            //     el.selected = true;
            // } else {
            //     el.selected = false;
        }
    })
    console.log(arrWithObj);
    showList(arrWithObj);

}


userInput.oninput = (e) => {
    console.log(e.target.value);
    checkInput(e.target.value.trim())
}

inputForm.onsubmit = function (e) {

    e.preventDefault();

    const input = userInput.value.trim();
    errorMsg.innerText = ''
    const [key, value] = input.split('=').map(str => str.trim());
    const obj = {[key]: value, id: lastId, selected: false};
    lastId++
    arrWithObj.push(obj);


    console.log(arrWithObj);
    showList(arrWithObj);

    userInput.value = '';
}

sortByNameBtn.onclick = function (e) {
    arrWithObj = [...arrWithObj].sort((a, b) => {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];

        return keyA.localeCompare(keyB);
    });

    showList(arrWithObj)

}

sortByValueBtn.onclick = function (e) {
    outputContainer.innerText = '';

    arrWithObj = [...arrWithObj].sort((a, b) => {
        const valueA = Object.values(a)[0];
        const valueB = Object.values(b)[0];

        return valueA.localeCompare(valueB);
    });
    showList(arrWithObj)
}

deleteBtn.onclick = function () {
    arrWithObj = arrWithObj.filter(elem => !elem.selected);

    showList(arrWithObj);
}

cleanBtn.onclick = function () {
    arrWithObj = [];

    showList(arrWithObj)
}



