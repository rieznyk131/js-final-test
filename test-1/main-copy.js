let outputContainer = document.getElementById('name-value-list');

let inputForm = document.getElementById('user-inputs');

let userInput = document.getElementById('name-value')



let arrWithObj = []

inputForm.onsubmit = function (e)  {
    e.preventDefault();

    const input = userInput.value.trim();

    if (!input.match(/^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/g)){
        alert('Invalid format. Use key=value');
        return;

    }
    const [key, value] = input.split('=').map(str => str.trim());
    const obj = {[key]: value};
    arrWithObj.push(obj);


    let outputElement = document.createElement('input');
    outputElement.type = 'checkbox';
    outputElement.id = 'my-checkbox';
    outputElement.checked = false;

    const label = document.createElement('label');
    label.htmlFor = 'my-checkbox';
    label.innerText = 'Select';

    label.prepend(outputElement);

    outputElement.classList.add('output-list-item');
    outputContainer.append(outputElement, label);

    outputElement.innerText =  `${key}=${value}`;
    console.log(arrWithObj);
}

let btnSortNames = document.getElementById('sort-by-names')

btnSortNames.onclick = function (e) {
    outputContainer.innerText = '';
    let outputSortedByNames = [...arrWithObj].sort((a, b) =>
    {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];

        return keyA.localeCompare(keyB);
    });

    outputSortedByNames.forEach((obj) => {
        let keyK = Object.keys(obj)[0];
        let valueK = obj[keyK];

        let sortedByNameElements = document.createElement('div');
        sortedByNameElements.classList.add('sorted-by-name');
        sortedByNameElements.classList.add('output-list-item');

        sortedByNameElements.innerText =  `${keyK}=${valueK}`;

        outputContainer.appendChild(sortedByNameElements)
    })

}

let btnSortByValue = document.getElementById('sort-by-values')
btnSortByValue.onclick = function (e) {
    outputContainer.innerText = '';

    let outputSortedByValue = [...arrWithObj].sort((a, b) => {
        const valueA = Object.values(a)[0];
        const valueB = Object.values(b)[0];

        return valueA.localeCompare(valueB);
    });

    outputSortedByValue.forEach((obj) => {
        let keyV = Object.keys(obj)[0];
        let valueV = obj[keyV];

        let sortedByValueElements = document.createElement('div');
        sortedByValueElements.classList.add('sorted-by-value');
        sortedByValueElements.classList.add('output-list-item');

        sortedByValueElements.innerText = `${keyV}=${valueV}`;

        outputContainer.appendChild(sortedByValueElements)
    })

}








