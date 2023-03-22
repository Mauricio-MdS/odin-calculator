const PRECISION = 1_000;

const display = document.querySelector("#result");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const backSpaceButton = document.querySelector(".backspace");

const equation = [];
const operators = ["+", "-", "*", "/"];
let currentNumber = "";

let divideByZero = false;
let alreadyDecimal = false;
let resultInMemory = false;

window.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "Backspace":
        case "Delete":
            backspace();
            break;
        case "=":
            operateAll();
            break;
        case "Escape":
        case "c":
        case "C":
            clear();
            break;
        case "/":
        case "*":
        case "+":
        case "-":
            operatorPressed(event.key);
            break;
        case ".":
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            numberPressed(event.key);
    }
})

for (numberButton of numberButtons) {
    numberButton.addEventListener("click", (event) => numberPressed(event.target.textContent));
}

for (operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", (event) => operatorPressed(event.target.dataset.operation));
}

equalButton.addEventListener("click", operateAll);

clearButton.addEventListener("click", clear);

backSpaceButton.addEventListener("click", backspace);

function backspace() {
    if (currentNumber) {
        if (currentNumber.charAt(currentNumber.length - 1) == ".") alreadyDecimal = false;
        currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    } else {
        equation.pop();
        const lastNumber = equation.pop();
        currentNumber = lastNumber !== undefined ? lastNumber : "";
    }
    updateDisplay();
}

function clear() {
    divideByZero = false;
    while (equation.length > 0) equation.pop();
    clearCurrentNumber();
    updateDisplay();
}

function clearCurrentNumber() {
    currentNumber = "";
    alreadyDecimal = false;
    resultInMemory = false;
}

function numberPressed(number) {
        if (resultInMemory) clear();
        if (alreadyDecimal && number == ".") return;
        if (number == ".") alreadyDecimal = true;

        currentNumber += number;
        updateDisplay();
}

function operateAll() {

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
    resultInMemory = true;
    updateDisplay();
}

function operatorPressed(operator) {
    if (!resultInMemory) {
        if (!currentNumber) return;
        equation.push(currentNumber);
    }
    equation.push(operator);
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
