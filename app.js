const formEl = document.querySelector("form");
const outputEl = document.querySelector("#output");
const inputEl = document.querySelector("#input");


formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;

    convert( inputValue);
});

//___________________________________________________________________________________________
function convert( codigo) {
    let mem_fisica = "";
    mem_fisica = Calculo_Fisica(codigo); //Paso el texto y Calculo las memorias y tiempo
    
    outputEl.innerText = 'Memorias estatica: ' + mem_fisica +" bytes"+ '\n Memoria dinamica: ' + '\n Tiempo:';
    
}
//___________________________________________________________________________________________
function Calculo_Fisica(codigo) {
    var memoria_fisica = "";
    var total = 0;
    Datos_Type = Calculo_Type(codigo);
    total = CalculoF_Principal(codigo,memoria_fisica,total);//Calculo lo declarado en el programa principal
    
    return total;
}
//___________________________________________________________________________________________
function CalculoF_Principal(codigo,memoria_fisica,total) {

    var codigo2 = codigo;

    const myRe = /(\:\s?)[.^]?(integer|char|real|boolean|string);/gim; //Extraemos todos los tipos de datos

    const principal =/var.+(;\sbegin)/; //Algoritmos del programa principal

    const punt =  /[-^](integer|char|real|boolean|string);/gim; //Para filtrar punteros

    codigo2 = codigo2.replace(/\s+/g, ' ').trim(); //Como el filtro anterior no funcionaba para la consola, se me ocurrio meter otro filtro que encontre :c.
    
    codigo2 = codigo2.match(principal);//Separo todo el texto del programa principal

    codigo2=codigo2.toString();//Lo convierto en arreglo con el texto (porque no queda de otra)
    console.log(codigo2);
    memoria_fisica = codigo2.match(myRe); //Hago otro filtro sobre el texto ya recortado del programa principal

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
//___________________________________________________________________________________________
function Calculo_Type(codigo){
    var codigo2 = codigo;
    cadenas = /(.+\s[=]\s)(string).+]/gim;
    valor = /(string).+[\d]]/gim;
    
    codigo2 = codigo.match(cadenas);
    codigo2=codigo2.toString();
    console.log(codigo2);

    
    codigo2 = codigo2.match(valor);
    codigo2=codigo2.toString();
    console.log(codigo2);

    codigo2 = codigo2.match(/\d.+\b/gim);
    codigo2 = codigo2.toString();
    console.log(codigo2);
    codigo2 = parseInt(codigo2,10);
    console.log(codigo2);
    
    return codigo;
}