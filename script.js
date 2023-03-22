const PRECISION = 1_000;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const display = document.querySelector("#result");

const equation = [];
const operators = ["+", "-", "*", "/"];
let currentNumber = "";

let divideByZero = false;
let alreadyDecimal = false;

for (numberButton of numberButtons) {
    numberButton.addEventListener("click", (event) => numberButtonHandler(event.target));
}

for (operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", (event) => operatorButtonHandler(event.target));
}

equalButton.addEventListener("click", () => {

    if (currentNumber === "") return;
    
    equation.push(currentNumber);
    clearCurrentNumber();

    while (equation.includes("*") || equation.includes("/")) {
        const operatorIndex = equation.findIndex(
            element => element === "*" || element === "/"
        );
        equation.splice(
            operatorIndex - 1, 
            3, 
            operate(equation[operatorIndex - 1], equation[operatorIndex], equation[operatorIndex + 1])
        );
    }

    while (equation.length > 2) {
        equation.splice(0, 3, operate(...equation.slice(0, 3)));
    }

    updateDisplay();
})

clearButton.addEventListener("click", () => {
    divideByZero = false;
    while (equation.length > 0) equation.pop();
    clearCurrentNumber();
    updateDisplay();
})

function clearCurrentNumber() {
    currentNumber = "";
    alreadyDecimal = false;
}

function numberButtonHandler(button) {
        if (alreadyDecimal && button.id == "decimal") return;
        if (button.id == "decimal") alreadyDecimal = true;

        currentNumber += button.textContent;
        updateDisplay();
}

function operatorButtonHandler(button) {
    if (!currentNumber) return;
    equation.push(currentNumber);
    equation.push(button.dataset.operation);
    clearCurrentNumber();
    updateDisplay();
}

function updateDisplay() {
    if (divideByZero) {
        display.value = "Divide by zero? Really?";
        return;
    }

    display.value = "";
    for (element of equation) {
        display.value += element + " "
    }
    display.value += currentNumber;
}


function add(a , b) {
    return a + b;
}

function divide (a , b) {
    if (b == 0) divideByZero = true;
    return a / b;
}

function multiply (a, b) {
    return a * b;
}


function subtract (a, b) {
    return a - b;
}

function operate(a, operator, b) {
    const x = Number(a);
    const y = Number(b);
    let result;
    switch(operator) {
        case "+":
            result = add(x, y);
            break;
        case "/":
            result = divide(x, y);
            break;
        case "*":
            result = multiply(x, y);
            break;
        case "-":
            result = subtract(x, y);
            break;
    }

    return Math.round(result*PRECISION)/PRECISION;
}
