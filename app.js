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

/*function textToBinary(input) {
    let output = "";
    //var myRe = /integer/;
    //var output = myRe.exec('integer');
    output = input;
    return output;
}*/
function textToBinary(input) {
    var output = "";
    const myRe = /integer/;
    var nuevo = "";
    output = input.split(myRe);
    
    
    
    //console.log(myRe.search("qweeqw integer integer"));
    
    return output;
}
 