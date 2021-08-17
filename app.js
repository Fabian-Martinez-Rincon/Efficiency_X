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
    outputEl.innerText = mem_fisica;
    //outputEl.innerText = 'Memorias estatica: ' + mem_fisica +" bytes"+ '\n Memoria dinamica: ' + '\n Tiempo:';
    
}

function Calculo_Fisica(codigo) {
    var memoria_fisica = "";
    var total = 0;
    const myRe = /(\:\s?)[.^]?(integer|char|real|boolean|string);/gim;

    const punt =  /[-^](integer|char|real|boolean|string);/gim;

    
    codigo = codigo.replace(/(\r\n|\n|\r|\s)/gm, ""); //Elimino todos los saltos de linea para poder procesar todo mas facil
    console.log(codigo);
    memoria_fisica = codigo.match(myRe);
    console.log(memoria_fisica);
    console.log(memoria_fisica.length);


    for (var i = 0; i < memoria_fisica.length;i++){//Una vez que tengo los datos filtrados, hago todas las operaciones
        
        punt.test(memoria_fisica[0]);//Esta linea no se porque va a aca, pero hace que funcione todo(no tocas :c)
       
        if(punt.test(memoria_fisica[i])){ //Si es puntero sumo 4bytes que es para todos igual
            total = total + 4;
            console.log("puntero");
        }
        else {
            if(/integer/gim.test(memoria_fisica[i])){ total = total + 6; console.log("integer");} // 6 bytes
            if(/char/gim.test(memoria_fisica[i])){ total = total + 1; console.log("char");} // 1 byte
            if(/real/gim.test(memoria_fisica[i])){ total = total + 8; console.log("real");} // 8 bytes
            if(/boolean/gim.test(memoria_fisica[i])){ total = total + 1; console.log("boolean");} // 1 bytes
            
        }
        
    }
    
    return codigo;
}

