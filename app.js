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
    //outputEl.innerText = mem_fisica;
    outputEl.innerText = 'Memorias estatica: ' + mem_fisica +" bytes"+ '\n Memoria dinamica: ' + '\n Tiempo:';
    
}

function Calculo_Fisica(codigo) {
    var memoria_fisica = "";
    var total = 0;
    var filtro = "program Problema; type cadena35 = string[35]; empleado = record dirCorreo: cadena35; edad: integer; sueldo:real; end: punt = empleado^; vector = array [1..500] of punt; lista = ^nodo; nodo = record dato: empleado; sig: lista; end; var caracter:char; numero: integer; numero : INTEGER; r:real; bool:boolean; puntero: ^integer; puntero2:^char; puntero:^real; puntero:^boolean; begin l:=nil; for i:=1 to 10 to begin read(emp.dirCorreo, emp.edad, emp.sueldo); if (emp.edad < 40) and (emp.sueldo < 40000) then exp.sueldo:= exp.sueldo + 7000; new(aux); aux^.dato := emp; aux^.sig: := l; l := aux; end; end.";
    
    const myRe = /(\:\s?)[.^]?(integer|char|real|boolean|string);/gim; //Extraemos todos los tipos de datos

    const principal =/var.+(;\sbegin)/; //Algoritmos del programa principal

    const punt =  /[-^](integer|char|real|boolean|string);/gim; //Para filtrar punteros

    
    codigo2 = codigo.replace(/(\r\n|\n|\r|\s)/gm, " "); //Elimino todos los saltos de linea y tabuladores para poder procesar todo mas facil

    codigo2 = codigo2.replace(/\s+/g, ' ').trim(); //Como el filtro anterior no funcionaba para la consola, se me ocurrio meter otro filtro que encontre 
    
    console.log(codigo2);

    codigo2 = codigo2.match(principal);//Lo convierto en arreglo con el texto (porque no queda de otra)

    codigo2=codigo2.toString();
    
    memoria_fisica = codigo2.match(myRe); //Hago otro filtro sobre el texto ya recortado del programa principal

    console.log(memoria_fisica);
    
    
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
    
    return total;
}

