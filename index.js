const calScript = document.querySelector("#calScript");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const calcDisplay = document.querySelector(".display");
const calcClear = document.querySelector(".clear");
const equalSign = document.querySelector("#equals");

equalSign.addEventListener("click", () => {
  operate(calcDisplay.textContent);
});

calScript.addEventListener("load", () => {
  calcDisplay.textContent = 0;
});

calcClear.addEventListener("click", () => {
  calcDisplay.textContent = 0;
  operators.forEach((item) => item.removeAttribute("disabled"));
});

digits.forEach((item) => {
  item.addEventListener("click", () => {
    // console.log(calcDisplay.textContent.includes("0"))
    // console.log(!checkForOperators(calcDisplay))
    // console.log(calcDisplay.textContent.length <=  1)
    if (calcDisplay.textContent.includes("0") && !checkForOperators(calcDisplay) && calcDisplay.textContent.length <= 1) {
      let replaced = calcDisplay.textContent.replace("0", item.value);
      calcDisplay.textContent = replaced;
    } else {
      calcDisplay.textContent += item.value
    }
  });
});

operators.forEach((item) => {
  item.addEventListener("click", () => {
    if (checkForOperators(calcDisplay)) {
      adjustingAttributes(item);
    } else {
      calcDisplay.textContent += item.value;
      item.setAttribute("disabled", "");
    }
  });
});

function checkForOperators(string) {
  if (
    string.textContent.includes("+") ||
    string.textContent.includes("-") ||
    string.textContent.includes("/") ||
    string.textContent.includes("*")
  ) {
    return true;
  } else {
    return false;
  }
}

function adjustingAttributes(button) {
  operators.forEach((item) => {
    if (item === button) {
      item.setAttribute("disabled", "");
      let replacedString = calcDisplay.textContent.replace(
        /\*|\/|\+|\-/,
        button.value
      );
      calcDisplay.textContent = replacedString;
    } else {
      item.removeAttribute("disabled");
    }
  });
}

function operate(displayValue) {
  console.log(displayValue)
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
