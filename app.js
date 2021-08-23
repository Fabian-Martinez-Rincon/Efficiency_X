const formEl = document.querySelector("form");
const outputEl = document.querySelector("#output");
const inputEl = document.querySelector("#input");


formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;
    codigo_pro = '';

    convert( inputValue);
});

//___________________________________________________________________________________________
function convert( codigo) {
    let mem_fisica = "";
    var actual = 0;
    const array_actual = 0 ;
    if (/type/.test(codigo)) {
        console.log('Hay type :D');
        var nombres = [];
        var valores = [];
        actual=array_actual [nombres,valores] = Calculo_Type(codigo); //Paso el texto y Calculo las memorias y tiempo
        nombres = actual[0];
        valores = actual[1];
        console.log('Arreglos: '+nombres);
        console.log('Arreglos: '+ valores);
        mem_fisica = Calculo_Fisica(codigo,nombres,valores);
    }
    else {
        console.log('No hay type :(');
    }
    
    


    outputEl.innerText = 'Memorias estatica: ' + mem_fisica +" bytes"+ '\n Memoria dinamica: ' + '\n Tiempo:';
    
}

//___________________________________________________________________________________________
function Calculo_Type(codigo){
    var codigo2 = codigo;
    var linea = "";
    contador = 0;
    const type = /(((.+)?[=](.+)?)(string).+;)|(((.+)?[=](.+)?)(record))|(((.+)?[=](.+)?)([-^](.+;)))|(((.+)?[=](.+)?)(array).+;)|(((.+)?[=](.+)?).+;)|var|procedure|function/;
    var nombre_variables = [] ; //Arreglo con todos los nombre
    var valor_variables = [] ; //Arreglo con todas las variables
    const array_actual = 0;
    var actual = 0;
    var nombre = "";
    var valor=0;


    while (linea != ("var")|("procedure")|("function")) {
        nombre = "";
        valor=0;
        actual = 0;

        codigo2 = type.exec(codigo);
        linea=codigo2[0].toString();
        console.log("Analizar: "+linea);

        if (/string/.test(linea)) {
            actual=array_actual [nombre,valor] = calculo_String(linea);
            nombre_variables.push(actual[0]);
            valor_variables.push(actual[1]);   
        }
        else if (/record/.test(linea)){
            actual=array_actual [nombre,valor] = calculo_Registro(linea,codigo,nombre_variables,valor_variables);
            nombre_variables.push(actual[0]);
            valor_variables.push(actual[1]); 
        }
        else if (/array/.test(linea)){
            actual=array_actual [nombre,valor] = calculo_Arreglos(linea,nombre_variables,valor_variables);
            nombre_variables.push(actual[0]);
            valor_variables.push(actual[1]); 

        }
        else if (/[-^]/.test(linea)){
            actual=array_actual [nombre,valor] = calculo_Punteros(linea,nombre_variables,valor_variables);
            nombre_variables.push(actual[0]);
            valor_variables.push(actual[1]); 
        }     

        


        console.log("nombres: "+ nombre_variables);
        console.log("valores: "+ valor_variables);
        
        
        codigo = codigo.replace(linea,'');
        
        console.log(contador);
        contador = contador + 1;
    }
    

    return [nombre_variables,valor_variables];
}

//___________________________________________________________________________________________
function calculo_String(codigo){
    var codigo2 = codigo;
    
    const valor = /(string).+[\d]]/gim;
    const nombre = /\w.+\b(.+)?[=]/g;
    var valor_n = 0;
    var variable = codigo2; //cadena35 = string[35];
    variable = codigo2.match(nombre); //cadena35 =
    variable = variable.toString(); //cadena35 =
    variable = variable.replace(/\s|[=]/g,''); //cadena35
    codigo2 = codigo2.match(valor); //string[35]
    codigo2=codigo2.toString(); //string[35]
    codigo2 = codigo2.replace(/[^(\d.+\b)]/gim,''); //35
    valor_n = parseInt(codigo2,10);
    valor_n = valor_n + 1; //longitud + 1
    return [variable,valor_n];
}
//___________________________________________________________________________________________
function calculo_Registro(linea,codigo,nombre_variables,valor_variables){
    var memoria_fisica = codigo;
    var codigo2 = codigo;
    var contador = 0;
    var valor_n = 0;
    var variable = "calvo";
    
    var variables_completas = "(integer|char|real|boolean|string";
    for (var i = 0; i < nombre_variables.length;i++){
        variables_completas = variables_completas + "|" + (nombre_variables[i]);
    }
    variables_completas = variables_completas + ")";
    const myRe = variables_completas; //Extraemos todos los tipos de datos
    let filtro1 = new RegExp(myRe,"gim");
    console.log(filtro1);
    const principal =/record.+(;\svar)/; //Algoritmos del programa principal
    const punt =  /[-^](integer|char|real|boolean|string);/gim; //Para filtrar punteros
    codigo2 = codigo.replace(/(\r\n|\n|\r|\s)/gm, " ");2
    codigo2 = codigo2.replace(/\s+/g, ' ').trim(); //Como el filtro anterior no funcionaba para la consola, se me ocurrio meter otro filtro que encontre :c.
    codigo2 = codigo2.match(principal);//Separo todo el texto del programa principal
    codigo2=codigo2.toString();//Lo convierto en arreglo con el texto (porque no queda de otra)
    memoria_fisica = codigo2.match(filtro1); //Hago otro filtro sobre el texto ya recortado del programa principal
    console.log("memoria fisica:" + memoria_fisica);
    
    for (var i = 0; i < (memoria_fisica.length);i++){//Una vez que tengo los datos filtrados, hago todas las operaciones
        
        punt.test(memoria_fisica[0]);//Esta linea no se porque va a aca, pero hace que funcione todo(no tocas :c)
        
        if(punt.test(memoria_fisica[i])){ //Si es puntero sumo 4bytes que es para todos igual
            valor_n = valor_n + 4;
            console.log("puntero");
        }
        else {
            if(/integer/gim.test(memoria_fisica[i])){ valor_n = valor_n + 6; console.log("integer");} // 6 bytes
            else if(/char/gim.test(memoria_fisica[i])){ valor_n = valor_n + 1; console.log("char");} // 1 byte
            else if(/real/gim.test(memoria_fisica[i])){ valor_n = valor_n + 8; console.log("real");} // 8 bytes
            else if(/boolean/gim.test(memoria_fisica[i])){ valor_n = valor_n + 1; console.log("boolean");} // 1 bytes
            else {
                contador = 0;
                while (memoria_fisica[i] != nombre_variables[contador]){
                    contador = contador+1;
                }
                valor_n = valor_n + valor_variables[contador];
                console.log(nombre_variables[contador]);
            }
        }
        
    }
    var codigo2 = linea;
    const nombre = /\w.+\b(.+)?[=]/g;
    var variable = codigo2;
    variable = codigo2.match(nombre);
    variable = variable.toString();
    variable = variable.replace(/\s|[=]/g,'');
    return [variable,valor_n];
}


//___________________________________________________________________________________________
function calculo_Punteros(codigo,nombre_variables,valor_variables){
    var codigo2 = codigo;
    
    const nombre = /\w.+\b(.+)?[=]/g;
    var valor_n = 0;
    var variable = codigo2;
    variable = codigo2.match(nombre);
    variable = variable.toString();
    variable = variable.replace(/\s|[=]/g,'');
    
    valor_n = valor_n + 4 ;
    return [variable,valor_n];
}


//___________________________________________________________________________________________
function calculo_Arreglos(codigo,nombre_variables,valor_variables){
    var codigo2 = codigo;
    tipo  = codigo.replace(/(\w.+\b(.+)?of).|(\s)/g,'');
    tipo = tipo.toString();
    tipo = tipo.replace(/[;]/,'');
    tipo = tipo.toString();
    console.log("tipo: "+tipo);
    const valor = /[[\d].+]/;
    const nombre = /\w.+\b(.+)?[=]/g;
    var valor_n = 0;
    var variable = codigo2;
    variable = codigo2.match(nombre);
    variable = variable.toString();
    variable = variable.replace(/\s|[=]/g,'');
    codigo2 = codigo2.match(valor);
    console.log("bla bla"+codigo2);
    codigo2=codigo2.toString();
    codigo2 = codigo2.match(/([.][\d].+\d)/);
    console.log("bla2: "+codigo2[0]);
    codigo2=codigo2[0].toString();
    codigo2 = codigo2.replace(/[.]/,'');
    codigo2=codigo2.toString();
    valor_n = parseInt(codigo2,10);
    if(/integer/gim.test(tipo)){ valor_n = valor_n * 6; console.log("integer");} // 6 bytes
    else if(/char/gim.test(tipo)){ valor_n = valor_n * 1; console.log("char");} // 1 byte
    else if(/real/gim.test(tipo)){ valor_n = valor_n * 8; console.log("real");} // 8 bytes
    else if(/boolean/gim.test(tipo)){ valor_n = valor_n * 1; console.log("boolean");} // 1 bytes
    else {
        var contador = 0;
        while (tipo != nombre_variables[contador]){
            contador = contador+1;
        }
        valor_n = valor_n * valor_variables[contador];
        console.log(nombre_variables[contador]);
    }
    valor_n = valor_n ;
    return [variable,valor_n];
}
//___________________________________________________________________________________________
function Calculo_Fisica(codigo,nombres,valores) {
    var memoria_fisica = codigo;
    var codigo2 = codigo;
    var total = 0;
    var variables_completas = "(integer|char|real|boolean|string";
    for (var i = 0; i < nombres.length;i++){
        variables_completas = variables_completas + "|" + (nombres[i]);
    }
    variables_completas = variables_completas + ")";
    const myRe = variables_completas; //Extraemos todos los tipos de datos
    console.log("CRUDO"+myRe);    

    let cosa = new RegExp(myRe,"gim");
    console.log(cosa);
    const principal =/var.+(;\sbegin)/; //Algoritmos del programa principal

    const punt =  /[-^](integer|char|real|boolean|string);/gim; //Para filtrar punteros



    codigo2 = codigo.replace(/(\r\n|\n|\r|\s)/gm, " ");
    codigo2 = codigo2.replace(/\s+/g, ' ').trim(); //Como el filtro anterior no funcionaba para la consola, se me ocurrio meter otro filtro que encontre :c.
    
    codigo2 = codigo2.match(principal);//Separo todo el texto del programa principal

    codigo2=codigo2.toString();//Lo convierto en arreglo con el texto (porque no queda de otra)
    console.log("Codigo: "+codigo2);
    
    memoria_fisica = codigo2.match(cosa); //Hago otro filtro sobre el texto ya recortado del programa principal
    

    console.log("memoria fisica:" + memoria_fisica);
    
    for (var i = 0; i < memoria_fisica.length;i++){//Una vez que tengo los datos filtrados, hago todas las operaciones
        
        punt.test(memoria_fisica[0]);//Esta linea no se porque va a aca, pero hace que funcione todo(no tocas :c)
        
        if(punt.test(memoria_fisica[i])){ //Si es puntero sumo 4bytes que es para todos igual
            total = total + 4;
            console.log("puntero");
        }
        else {
            if(/integer/gim.test(memoria_fisica[i])){ total = total + 6; console.log("integer");} // 6 bytes
            else if(/char/gim.test(memoria_fisica[i])){ total = total + 1; console.log("char");} // 1 byte
            else if(/real/gim.test(memoria_fisica[i])){ total = total + 8; console.log("real");} // 8 bytes
            else if(/boolean/gim.test(memoria_fisica[i])){ total = total + 1; console.log("boolean");} // 1 bytes
            else {
                var contador = 0;
                while (memoria_fisica[i] != nombres[contador]){
                    contador = contador+1;
                }
                total = total + valores[contador];
                console.log(nombres[contador]);
            }
        }
        
    }
    return total;
}
