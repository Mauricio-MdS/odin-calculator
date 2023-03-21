const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const display = document.querySelector("#result");

const equation = [];
const operators = ["+", "-", "*", "/"];

let currentNumber = "";

for (numberButton of numberButtons) {
    numberButton.addEventListener("click", (event) => numberButtonHandler(event.target));
}

for (operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", (event) => operatorButtonHandler(event.target));
}

equalButton.addEventListener("click", () => {
    /*TODO*/
})

function numberButtonHandler(button) {
        currentNumber += button.textContent
        updateDisplay();
}

function operatorButtonHandler(button) {
    if (!currentNumber) return;
    equation.push(currentNumber);
    equation.push(button.dataset.operation);
    currentNumber = "";
    updateDisplay();
}

function updateDisplay() {
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
    return a / b;
}

function multiply (a, b) {
    return a * b;
}


function subtract (a, b) {
    return a - b;
}

function operate(a, operator, b) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "/":
            return divide(a, b);
        case "*":
            return multiply(a, b);
        case "-":
            return subtract(a, b);
    }
}
