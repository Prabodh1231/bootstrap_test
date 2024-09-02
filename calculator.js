let numberKey = document.querySelectorAll(".number");
let functionKey = document.querySelectorAll(".function");
let firstNumber = "";
let getFirstNumber = false;
let secondNumber = "";
let getSecondNumber = false;
let functionButton = "";
let display = document.querySelector(".display");
let functionClicked = false;
let answer = document.querySelector(".answer");
let decimal = document.querySelector(".decimal");
let decimalClicked = false;
let clear = document.querySelector(".clear");
let previousValue = "";
let backspace = document.querySelector(".undo");
let resultClick = false;

numberKey.forEach((button) => {
  button.addEventListener("click", () => {
    if (display.textContent === "0") {
      display.textContent = "";
    }
    let number = button.textContent;
    previousValue = display.textContent;
    if (!functionClicked) {
      firstNumber += number;
      display.textContent = firstNumber;
      getFirstNumber = true;
    } else {
      secondNumber += number;
      display.textContent = secondNumber;
      getSecondNumber = true;
    }
  });
});

decimal.addEventListener("click", () => {
  if (!decimalClicked) {
    decimalClicked = true;
    if (!functionClicked) {
      firstNumber += ".";
      display.textContent = firstNumber;
    } else {
      secondNumber += ".";
      display.textContent = secondNumber;
    }
  }
});

functionKey.forEach((button) => {
  button.addEventListener("click", () => {
    if (resultClick && !getSecondNumber) {
      firstNumber = display.textContent;
      functionButton = button.textContent;
      secondNumber = "";
      previousValue = "";
      functionClicked = true;
      resultClick = false;
      decimalClicked = false;
      getFirstNumber = true;
      getSecondNumber = false;
    } else if (!getSecondNumber) {
      functionButton = button.textContent;
      functionClicked = true;
      decimalClicked = false;
    } else {
      let result = calculate(
        Number(firstNumber),
        Number(secondNumber),
        functionButton
      );
      previousValue = result;
      display.textContent = result;
      functionClicked = true;
      firstNumber = result;
      functionButton = button.textContent;
      secondNumber = "";
      previousValue = "";
      decimalClicked = false;
      getFirstNumber = false;
      getSecondNumber = false;
    }
  });
});

backspace.addEventListener("click", () => {
  let currentValue = display.textContent;
  let newValue = currentValue.slice(0, -1);
  display.textContent = newValue;
  if (!functionClicked && getFirstNumber && !decimalClicked) {
    firstNumber = newValue;
  } else if (!functionClicked && getFirstNumber && decimalClicked) {
    let splitFirstNumber = firstNumber.split("");
    if (!splitFirstNumber.includes(".")) {
      firstNumber = newValue;
    } else {
      firstNumber = newValue;
      decimalClicked = false;
    }
  } else if (functionClicked && getSecondNumber && !decimalClicked) {
    secondNumber = newValue;
  } else if (functionClicked && getSecondNumber && decimalClicked) {
    let splitFirstNumber = secondNumber.split("");
    if (!splitFirstNumber.includes(".")) {
      secondNumber = newValue;
    } else {
      secondNumber = newValue;
      decimalClicked = false;
    }
  }
});

function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return NaN;
  }
}

answer.addEventListener("click", () => {
  if (!getFirstNumber) {
    return;
  } else if (!getSecondNumber) {
    return;
  } else {
    let result = calculate(
      Number(firstNumber),
      Number(secondNumber),
      functionButton
    );
    display.textContent = Math.round(result * 10) / 10;
    firstNumber = "";
    secondNumber = "";
    functionButton = "";
    previousValue = "";
    resultClick = true;
    functionClicked = false;
    decimalClicked = false;
    getFirstNumber = false;
    getSecondNumber = false;
  }
});

clear.addEventListener("click", () => {
  display.textContent = "";
  firstNumber = "";
  secondNumber = "";
  functionButton = "";
  functionClicked = false;
  decimalClicked = false;
  getFirstNumber = false;
  getSecondNumber = false;
  resultClick = false;
});
