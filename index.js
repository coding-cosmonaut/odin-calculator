const calScript = document.querySelector("#calScript");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const calcDisplay = document.querySelector(".display");
const calcClear = document.querySelector(".clear");
const equalSign = document.querySelector("#equals");
const dot = document.querySelector(".period");
let numOfPeriods=[];

equalSign.addEventListener("click", () => {
  operate(calcDisplay.textContent);
});

dot.addEventListener("click", () => {
  if (calcDisplay.textContent.includes('.')) {
    console.log('in first')
    if (checkForOperators(calcDisplay)) {
      if (numOfPeriods.length >= 1) {
        return;
      }
      numOfPeriods = calcDisplay.textContent.match(/\./g)
      calcDisplay.textContent += dot.value;
    }
  } else if (!calcDisplay.textContent.includes('.') && checkForOperators(calcDisplay)) {
    console.log('else if')
    numOfPeriods.push('.')
    calcDisplay.textContent += dot.value;
  }
  else {
    console.log('else state')
    calcDisplay.textContent += dot.value;
  }
});

calScript.addEventListener("load", () => {
  calcDisplay.textContent = 0;
});

calcClear.addEventListener("click", () => {
  calcDisplay.textContent = 0;
  //operators.forEach((item) => item.removeAttribute("disabled"));
  numOfPeriods =[]
});

digits.forEach((item) => {
  item.addEventListener("click", () => {
    // console.log(calcDisplay.textContent.includes("0"))
    // console.log(!checkForOperators(calcDisplay))
    // console.log(calcDisplay.textContent.length <=  1)
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

function checkForSecondDigit(string) {
  let operatorIdx = string
    .split("")
    .findIndex((op) => op === "+" || op === "-" || op === "/" || op === "*");
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

function adjustingAttributes(button) {
  operators.forEach((item) => {
    if (item === button) {
      //item.setAttribute("disabled", "");
      let replacedString = calcDisplay.textContent.replace(
        /\*|\/|\+|\-/,
        button.value
      );
      calcDisplay.textContent = replacedString;
    } else {
      //item.removeAttribute("disabled");
    }
  });
}

function operate(displayValue, secondOperator) {
  if (!displayValue) return;
  operators.forEach((item) => item.removeAttribute("disabled"));
  const slicingIdx = displayValue
    .split("")
    .findIndex((op) => op === "+" || op === "-" || op === "/" || op === "*");
  if (slicingIdx !== -1) {
    let firstNumber = displayValue.slice(0, slicingIdx);
    let operator = displayValue.slice(slicingIdx, slicingIdx + 1);
    let secondNumber = displayValue.slice(slicingIdx + 1);
    if (secondNumber && secondNumber !== '.') {
      numOfPeriods=[]
      let result;
      switch (operator) {
        case "+":
          result = add(firstNumber, secondNumber).toString();
          calcDisplay.textContent = secondOperator
            ? result.padEnd(result.length + 1, secondOperator)
            : result;
          break;
        case "-":
          result = subtract(firstNumber, secondNumber).toString();
          calcDisplay.textContent = secondOperator
            ? result.padEnd(result.length + 1, secondOperator)
            : result;
          break;
        case "/":
          result = divide(firstNumber, secondNumber);
          calcDisplay.textContent = secondOperator
            ? result.toString().padEnd(result.length + 1, secondOperator)
            : result;
          break;
        case "*":
          result = multiply(firstNumber, secondNumber).toString();
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
  let num2Iterate = num2.split("").findIndex((item) => item !== "0");
  if (num2 === "0" || num2Iterate === -1) {
    alert("Can't divide by zero!");
    return "0";
  } else {
    return Number(num) / Number(num2);
  }
}
