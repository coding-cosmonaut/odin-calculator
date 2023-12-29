// let number1;
// let operator;
// let number2;

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const calcDisplay = document.querySelector(".display");
const calcClear = document.querySelector(".clear");
let calcDisplayValue = "";

// console.log(digits);
// console.log(operators);
console.dir(calcDisplay);

digits.forEach((item) => {
  item.addEventListener("click", () => {
    calcDisplay.textContent += item.value;
    calcDisplayValue = calcDisplay.textContent;
  });
});

operators.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(calcDisplay, calcDisplay.textContent)
    if (
      calcDisplayValue.includes("+") ||
      calcDisplayValue.includes("-") ||
      calcDisplayValue.includes("/") ||
      calcDisplayValue.includes("*")
    ) {
      console.log("Yes Included");
      adjustingAttributes(item)
    } else {
      calcDisplay.textContent += item.value;
      calcDisplayValue = calcDisplay.textContent;
      item.setAttribute('disabled', '')
    }
  });
});

calcClear.addEventListener("click", () => {
  calcDisplay.textContent = "";
  calcDisplayValue = "";
});

function adjustingAttributes(button) {
  operators.forEach((item) => {
    console.log(button,'button')
    if (item === button) {
      item.setAttribute("disabled", "");
      calcDisplay.textContent =  calcDisplayValue.replace(/\*|\/|\+|\-/, button.value);
    } else {
      item.removeAttribute("disabled");
    }
  });
}

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
