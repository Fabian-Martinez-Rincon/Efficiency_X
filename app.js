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
    let mem_fisica = 0;
    let mem_dinamica = 0;
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
        actual = Calculo_Fisica(codigo,nombres,valores);
    }
    else {
        console.log('No hay type :(');
        mem_fisica = Calculo_Fisica2(codigo);
    }
    
    if (/new|dispose/.test(codigo)) {

        console.log('Hay memoria dinamica');
        mem_dinamica = Calculo_Dinamica(codigo);
        actual=array_actual [nombres,valores] = Calculo_Type_New(codigo,nombres,valores); //Paso el texto y Calculo las memorias y tiempo
        console.clear();
        nombres = actual[0];
        valores = actual[1];
        console.log('Arreglos: '+nombres);
        console.log('Arreglos: '+ valores);

    }
    else {
        console.log('No hay memoria dinamica');
        memoria_fisica = 0; 
    }


    outputEl.innerText = 'Memorias estatica: ' + mem_fisica +" bytes"+ '\n Memoria dinamica: '+mem_dinamica+' bytes' + '\n Tiempo:';
    
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
    var variable = "";
    
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
function calculo_Punteros(codigo){
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
    var nombres2 = [];
    var valores2 = [];
    var nombre = "";
    var valor = 0;
    var array_actual = 0;
    var variables_completas = "[-^]?((integer|char|real|boolean|string";
    for (var i = 0; i < nombres.length;i++){
        variables_completas = variables_completas + "|" + (nombres[i]);
    }
    variables_completas = variables_completas + ");)";
    const myRe = variables_completas; //Extraemos todos los tipos de datos

    let cosa = new RegExp(myRe,"gim");
    console.log(cosa);
    const principal =/var.+(;\sbegin)/; //Algoritmos del programa principal

    const punt2 =  "[-^]"+variables_completas; //Para filtrar punteros
    let punt = new RegExp(punt2,"gim");

    /*
    codigo2 = codigo.replace(/(\r\n|\n|\r|\s)/gm, " ");
    codigo2 = codigo2.replace(/\s+/g, ' ').trim(); //Como el filtro anterior no funcionaba para la consola, se me ocurrio meter otro filtro que encontre :c.
    
    codigo2 = codigo2.match(principal);//Separo todo el texto del programa principal

    codigo2=codigo2.toString();//Lo convierto en arreglo con el texto (porque no queda de otra)
    console.log("Codigo: "+codigo2);
    
    memoria_fisica = codigo2.match(cosa); //Hago otro filtro sobre el texto ya recortado del programa principal*/

    var linea = "";
    const type = /.+\s?/;
    var codigo2 = codigo;
    while ((/var/.test(linea)) != true ) { //Elimino todo hasta el primer var
        codigo2 = type.exec(codigo);
        linea=codigo2[0].toString();        
        codigo = codigo.replace(linea,'');
        
    }
    while((/begin/.test(linea)) != true){//Una vez que tengo los datos filtrados, hago todas las operaciones
        nombre = "";
        valor = 0;
        codigo2 = type.exec(codigo);
        linea=codigo2[0].toString();        
        codigo = codigo.replace(linea,'');
        console.log("Linea"+linea);
        punt.test(linea);//Esta linea no se porque va a aca, pero hace que funcione todo(no tocas :c)
        
        if(punt.test(linea)){ //Si es puntero sumo 4bytes que es para todos igual
            total = total + 4;
            console.log("puntero");
        }
        else {
            if(/integer/gim.test(linea)){ 
                total = total + 6; console.log("integer"); 
                nombres2.push(Separar_nombre_valor(linea));
                valores2.push(6);
            } // 6 bytes
            else if(/char/gim.test(linea)){
                 total = total + 1; console.log("char");
                 nombres2.push(Separar_nombre_valor(linea));
                 valores2.push(1);
                } // 1 byte
            else if(/real/gim.test(linea)){ 
                total = total + 8; console.log("real");
                nombres2.push(Separar_nombre_valor(linea));
                valores2.push(8);
            } // 8 bytes
            else if(/boolean/gim.test(linea)){
                 total = total + 1; console.log("boolean");
                 nombres2.push(Separar_nombre_valor(linea));
                 valores2.push(1);
                } // 1 bytes
            else {
                if (/(.+)?begin/.test(linea) != true) {
                    var contador = 0;
                    let actual_exp = new RegExp(nombres[contador],"");
                    while (((actual_exp.test(linea)) != true) &(contador < 100)){ //La segunda condicion la puse por las dudas
                        contador = contador+1;
                        actual_exp = new RegExp(nombres[contador],"");  
                    }
                    nombres2.push(Separar_nombre_valor(nombres[contador]));
                    valores2.push(valores[contador]);
                    total = total + valores[contador];
                }
            }
        }
        console.log(total);
        console.log(nombres2);
    }
            /*actual=array_actual [nombre,valor] = calculo_String(linea);
            nombres2.push(actual[0]);
            valores2.push(actual[1]);  */
    
    return [nombres2,valores2,total];
}

//___________________________________________________________________________________________
function Calculo_Fisica2(codigo) {
    var memoria_fisica = codigo;
    var codigo2 = codigo;
    var total = 0;
    var variables_completas = "[-^]?((integer|char|real|boolean|string));";
    
    const myRe = variables_completas; //Extraemos todos los tipos de datos
    let cosa = new RegExp(myRe,"gim");
    console.log(cosa);
    const principal =/var.+(;\sbegin)/; //Algoritmos del programa principal

    const punt =  /[-^](integer|char|real|boolean|string)/; //Para filtrar punteros
    console.log("aaaaaaaaaaaaaa"+punt);
   


    codigo2 = codigo.replace(/(\r\n|\n|\r|\s)/gm, " ");
    codigo2 = codigo2.replace(/\s+/g, ' ').trim(); //Como el filtro anterior no funcionaba para la consola, se me ocurrio meter otro filtro que encontre :c.
    
    codigo2 = codigo2.match(principal);//Separo todo el texto del programa principal

    codigo2=codigo2.toString();//Lo convierto en arreglo con el texto (porque no queda de otra)
    console.log("Codigo: "+codigo2);
    
    memoria_fisica = codigo2.match(cosa); //Hago otro filtro sobre el texto ya recortado del programa principal
    

    console.log( memoria_fisica);
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
        }
        
    }
    return total;
}

//___________________________________________________________________________________________
function Calculo_Dinamica(codigo){
    var codigo2 = codigo;
    var total = 0;
    var linea = "";
    const type = /.+\s?/;

    while ((/begin/.test(linea)) != true ) { //Elimino todo hasta el primer begin
        codigo2 = type.exec(codigo);
        linea=codigo2[0].toString();        
        codigo = codigo.replace(linea,'');
        
    }
    console.log("Resultado: "+codigo);
    
    while ((/end/.test(linea)) != true ) { //Elimino todo hasta el primer begin
        codigo2 = type.exec(codigo);
        linea=codigo2[0].toString();  
        if (/(.+)?new/.test(linea) ) {
            total = Calculo_New(linea);
        }
        
        codigo = codigo.replace(linea,'');
    }

    return total;
}

//___________________________________________________________________________________________
function Calculo_New(linea){
    var basura = /new(.+)?[(]|([).](.+)?[;])/g;
    linea = linea.replace(basura,'');
    console.log(linea);
    return 2;
}

//___________________________________________________________________________________________

function Separar_nombre_valor(codigo){
    
    var codigo2 = codigo;
    const nombre = /(:(.+)?;)|(\s)?/g;
    var variable = codigo2; //cadena35 = string[35];
    variable = variable.replace(nombre,''); //cadena35 
    return variable;
} 
//___________________________________________________________________________________________
function Calculo_Type_New(codigo,nombres,valores){
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

        
        if (/[-^]/.test(linea)){
            actual=array_actual [nombre,valor] = calculo_Punteros_new(linea,nombres,valores);
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
function calculo_Punteros_new(codigo,nombres,valores){
    var codigo2 = codigo;
    
    const nombre = /((.+)?[=](.+)[-^$])|\s(.+)?|;/g;
    var valor_n = 0;
    var variable = codigo2;
    variable = variable.replace(nombre,''); //nodo
    var contador = 0;
    let actual_exp = new RegExp(nombres[contador],"");

    while (((actual_exp.test(variable)) != true) &(contador < 100)){ //La segunda condicion la puse por las dudas
        contador = contador+1;
        actual_exp = new RegExp(nombres[contador],"");  
    }
    valor_n = valor_n + valores[contador] ;
    return [variable,valor_n];
}