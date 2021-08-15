const formEl = document.querySelector("form");
const outputEl = document.querySelector("#output");
const inputEl = document.querySelector("#input");


formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;
    const inputType = e.target.input.getAttribute("data-type");

    convert(inputType, inputValue);
});



function convert(type, codigo) {
    let mem_fisica = "";
    mem_fisica = Calculo_Fisica(codigo); //Paso el texto y Calculo las memorias y tiempo
    /*let mem_dinamica = "";
    mem_dinamica = Calculo_Dinamica(codigo);
    let tiempo = "";
    tiempo = Calculo_Tiempo(codigo);*/
    outputEl.innerText = 'Memorias estatica: ' + mem_fisica +" bytes"+ '\n Memoria dinamica: ' + '\n Tiempo:';
    
}

function Calculo_Fisica(codigo) {
    var memoria_fisica = "";
    var cantidad_integer = 0;
    /*var cantidad_char = 0;
    var cantidad_real = 0;
    var cantidad_boolean = 0;
    var cantidad_string = 0;
    var cantidad_puntero = 0;
    var tota = 0;*/
    const myRe = /integer;/gi; //Tengo que sacar los patrones para que solo calcule las variables de la funcion principal
    memoria_fisica = codigo.match(myRe);
    cantidad_integer = (memoria_fisica.length) * 6;
    
    
    return cantidad_integer;
}
 