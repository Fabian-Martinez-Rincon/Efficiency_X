const formEl = document.querySelector("form");
const outputEl = document.querySelector("#output");
const inputEl = document.querySelector("#input");
const copy = document.querySelector(".copy");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = e.target.input.value;
  const inputType = e.target.input.getAttribute("data-type");

  convert(inputType, inputValue);
});



function convert(type, inputValue) {
    let output = "";
    output = textToBinary(inputValue); //Paso el texto y Calculo las memorias y tiempo
    outputEl.innerText =// output;//Imprimo el consumo de los datos
}

function textToBinary(input) {
  let output = "";
  output = input
    .split("")
    .map((latter) => latter.charCodeAt(0))
    .map((latter) => latter.toString(2))
    .join(" ");

  return output;
}
