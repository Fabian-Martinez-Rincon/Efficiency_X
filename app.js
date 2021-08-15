const formEl = document.querySelector("form");
const outputEl = document.querySelector("#output");
const inputEl = document.querySelector("#input");


formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;
    const inputType = e.target.input.getAttribute("data-type");

    convert(inputType, inputValue);
});



function convert(type, inputValue) {
    let output = "";
    output = textToBinary(inputValue); //Paso el texto y Calculo las memorias y tiempo
    //outputEl.innerText = output;//Imprimo el consumo de los datos
    outputEl.innerText = 'Memorias estatica: ' + output + '\n Memoria dinamica: ' + '\n Tiempo:';
}

function textToBinary(input) {
    let output = "";
    output = input


    return output;
}
