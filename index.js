const calScript = document.querySelector("#calScript");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const calcDisplay = document.querySelector(".display");
const calcClear = document.querySelector(".clear");
const equalSign = document.querySelector("#equals");
const dot = document.querySelector(".period");
const deleteBttn = document.querySelector(".delete");
let numOfPeriods = [];

equalSign.addEventListener("click", () => {
  operate(calcDisplay.textContent);
});

deleteBttn.addEventListener("click", () => {
  if (calcDisplay.textContent === "0" && calcDisplay.textContent.length === 1) {
    return;
  } else {
    let slicedNDiced = calcDisplay.textContent.slice(0, -1);
    calcDisplay.textContent = slicedNDiced;
  }
});

dot.addEventListener("click", () => {
  if (calcDisplay.textContent.includes(".")) {
    if (checkForOperators(calcDisplay)) {
      if (numOfPeriods.length >= 1) {
        return;
      }
      numOfPeriods = calcDisplay.textContent.match(/\./g);
      calcDisplay.textContent += dot.value;
    }
  } else if (
    !calcDisplay.textContent.includes(".") &&
    checkForOperators(calcDisplay)
  ) {
    numOfPeriods.push(".");
    calcDisplay.textContent += dot.value;
  } else {
    calcDisplay.textContent += dot.value;
  }
});

calScript.addEventListener("load", () => {
  calcDisplay.textContent = 0;
});

calcClear.addEventListener("click", () => {
  calcDisplay.textContent = 0;
  numOfPeriods = [];
});

digits.forEach((item) => {
  item.addEventListener("click", () => {
    if (
      calcDisplay.textContent.includes("0") &&
      !checkForOperators(calcDisplay) &&
      calcDisplay.textContent.length <= 1
    ) {
      let replaced = calcDisplay.textContent.replace("0", item.value);
      calcDisplay.textContent = replaced;
    } else {
      calcDisplay.textContent += item.value;
    }
  });
});

operators.forEach((item) => {
  item.addEventListener("click", () => {
    if (checkForOperators(calcDisplay)) {
      if (checkForSecondDigit(calcDisplay.textContent)) {
        operate(calcDisplay.textContent, item.value);
      } else {
        adjustingAttributes(item);
      }
    } else {
      calcDisplay.textContent += item.value;
      //item.setAttribute("disabled", "");
    }
  });
});

function round(num) {
  return Math.round(num * 1000) / 1000;
}

function checkForSecondDigit(string) {
  let operatorIdx = string
    .split("")
    .findLastIndex(
      (op) => op === "+" || op === "-" || op === "/" || op === "*"
    );
  let secondNum = string.slice(operatorIdx + 1);
  if (operatorIdx !== -1 && secondNum !== "") {
    return true;
  } else {
    return false;
  }
}

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

function checkForNegative(string) {
  let newString = string.indexOf("-", 0);
  if (newString !== -1) {
    return true;
  } else false;
}

function adjustingAttributes(button) {
  operators.forEach((item) => {
    if (item === button) {
      if (checkForNegative(calcDisplay.textContent)) {
        let oldString = calcDisplay.textContent.slice(0, -1);
        let newString = calcDisplay.textContent
          .slice(-1)
          .replace(/\*|\/|\+|\-/, button.value);
        calcDisplay.textContent = oldString + newString;
      } else {
        let replacedString = calcDisplay.textContent.replace(
          /\*|\/|\+|\-/,
          button.value
        );
        calcDisplay.textContent = replacedString;
      }
    }
  });
}

function operate(displayValue, secondOperator) {
  if (!displayValue) return;
  const slicingIdx = displayValue
    .split("")
    .findLastIndex(
      (op) => op === "+" || op === "-" || op === "/" || op === "*"
    );
  if (slicingIdx !== -1) {
    let firstNumber = displayValue.slice(0, slicingIdx);
    let operator = displayValue.slice(slicingIdx, slicingIdx + 1);
    let secondNumber = displayValue.slice(slicingIdx + 1);
    if (secondNumber && secondNumber !== ".") {
      numOfPeriods = [];
      let result;
      switch (operator) {
        case "+":
          result = round(add(firstNumber, secondNumber)).toString();
          calcDisplay.textContent = secondOperator
            ? result.padEnd(result.length + 1, secondOperator)
            : result;
          break;
        case "-":
          result = round(subtract(firstNumber, secondNumber)).toString();
          calcDisplay.textContent = secondOperator
            ? result.padEnd(result.length + 1, secondOperator)
            : result;
          break;
        case "/":
          result = round(divide(firstNumber, secondNumber)).toString();
          calcDisplay.textContent = secondOperator
            ? result.toString().padEnd(result.length + 1, secondOperator)
            : result;
          break;
        case "*":
          result = round(multiply(firstNumber, secondNumber)).toString();
          calcDisplay.textContent = secondOperator
            ? result.padEnd(result.length + 1, secondOperator)
            : result;
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
  let num2Iterate = num2.split("").findIndex((item) => item === "0" || item === '.');
  if (num2 === "0" || num2[num2Iterate] !== '0' || num2[num2Iterate] !== '.') {
    alert("Can't divide by zero!");
    return "0";
  } else {
    return Number(num) / Number(num2);
  }
}
