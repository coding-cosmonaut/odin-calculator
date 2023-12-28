let number1;
let operator;
let number2;

const digits = document.querySelectorAll('.digit');
const calcDisplay = document.querySelector('.display');
const calcClear = document.querySelector('.clear');



console.log(digits)
console.dir(calcDisplay)

digits.forEach((item) => {
  console.log(item)
  item.addEventListener('click', (() => {
    console.log(item.value)
    console.log(calcDisplay.textContent)
    calcDisplay.textContent += item.value
  }))
})

calcClear.addEventListener('click', (() => {
  calcDisplay.textContent = '';
}))




function add(num, num2) {
  return Number(num) + Number(num2);
}

function subtract(num, num2) {
  return Number(num) - Number(num2);
}

function multiply(num, num2) {
  return Number(num) * Number(num2);
}

function divide(num, num2) {
  return Number(num) / Number(num2);
}
