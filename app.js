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
    var total = 0;
    const myRe = /(\:\s?)[.^]?(integer|char|real|boolean|string);/gim;

    const punt =  /[-^](integer|char|real|boolean|string);/gim;

    memoria_fisica = codigo.match(myRe);
    console.log(memoria_fisica);
    console.log(memoria_fisica.length);


    for (var i = 0; i < memoria_fisica.length;i++){
        
        punt.test(memoria_fisica[0]);//Esta linea no se porque va a aca, pero hace que funcione todo(no tocas :c)
       
        if(punt.test(memoria_fisica[i])){ //Si es puntero sumo 4bytes que es para todos igual
            total = total + 4;
            console.log("puntero");
        }
        else {
            if(/integer/gim.test(memoria_fisica[i])){ total = total + 6; console.log("integer");}
            if(/char/gim.test(memoria_fisica[i])){ total = total + 1; console.log("char");}
            if(/real/gim.test(memoria_fisica[i])){ total = total + 8; console.log("real");}
            if(/boolean/gim.test(memoria_fisica[i])){ total = total + 1; console.log("boolean");}
            
        }
        
    }
    
    return total;
}

