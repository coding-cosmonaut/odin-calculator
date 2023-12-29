const calScript = document.querySelector("#calScript");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const calcDisplay = document.querySelector(".display");
const calcClear = document.querySelector(".clear");
const equalSign = document.querySelector("#equals");
let calcDisplayValue = "";

equalSign.addEventListener("click", () => {
  operate(calcDisplayValue);
});

calScript.addEventListener("load", () => {
  calcDisplay.setAttribute("value", "0");
});

calcClear.addEventListener("click", () => {
  calcDisplay.textContent = "";
  calcDisplayValue = "";
  operators.forEach((item) => item.removeAttribute("disabled"));
});

digits.forEach((item) => {
  item.addEventListener("click", () => {
    calcDisplay.textContent += item.value;
    calcDisplayValue = calcDisplay.textContent;
  });
});

operators.forEach((item) => {
  console.log(item)
  item.addEventListener("click", () => {
    if (
      calcDisplayValue.includes("+") ||
      calcDisplayValue.includes("-") ||
      calcDisplayValue.includes("/") ||
      calcDisplayValue.includes("*")
    ) {
      adjustingAttributes(item);
    } else {
      calcDisplay.textContent += item.value;
      calcDisplayValue = calcDisplay.textContent;
      item.setAttribute("disabled", "");
    }
  });
});


function adjustingAttributes(button) {
  operators.forEach((item) => {
    if (item === button) {
      item.setAttribute("disabled", "");
      calcDisplay.textContent = calcDisplayValue.replace(
        /\*|\/|\+|\-/,
        button.value
      );
    } else {
      item.removeAttribute("disabled");
    }
  });
}


function operate(displayValue) {
  if (!displayValue) return;
  operators.forEach((item) => item.removeAttribute("disabled"));
  const slicingIdx = displayValue
    .split("")
    .findIndex((op) => op === "+" || op === "-" || op === "/" || op === "*");
  if (slicingIdx !== -1) {
    let firstNumber = displayValue.slice(0, slicingIdx);
    let operator = displayValue.slice(slicingIdx, slicingIdx + 1);
    let secondNumber = displayValue.slice(slicingIdx + 1);
    if (secondNumber) {

      switch (operator) {
        case "+":
          calcDisplay.textContent = add(firstNumber, secondNumber);
          calcDisplayValue = calcDisplay.textContent;
          break;
        case "-":
          calcDisplay.textContent = subtract(firstNumber, secondNumber);
          calcDisplayValue = calcDisplay.textContent;
          break;
        case "/":
          calcDisplay.textContent = divide(firstNumber, secondNumber);
          calcDisplayValue = calcDisplay.textContent;
          break;
        case "*":
          calcDisplay.textContent = multiply(firstNumber, secondNumber);
          calcDisplayValue = calcDisplay.textContent;
          break;
        default:
          return;
      }
    } else return;
  } else {
    return;
  }
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
