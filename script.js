document.addEventListener("DOMContentLoaded", function () {
    var board = document.getElementById("board");

    // Create circles for numbers 1 to 90
    for (var i = 1; i <= 90; i++) {
        var circle = document.createElement("div");
        circle.classList.add("circle");
        circle.id = "circle" + i;
        circle.innerText = i;
        board.appendChild(circle);
    }

    // Call a new number when the button is clicked
    const generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click", callNewNumber);
});

// Array to keep track of called numbers
let calledNumbers = [];

// Function to generate an array of numbers from 1 to 90 (inclusive)
function generateNumberArray() {
    const numbers = [];
    for (let i = 1; i <= 90; i++) {
        numbers.push(i);
    }
    return numbers;
}

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to call a new number
function callNewNumber() {
    if (calledNumbers.length === 90) {
        alert("All numbers have been generated!\nRefresh to Restart");
        return;
    }

    // Generate a new random number
    const remainingNumbers = generateNumberArray().filter(number => !calledNumbers.includes(number));
    const shuffledNumbers = shuffleArray(remainingNumbers);
    const newNumber = shuffledNumbers[0];
    calledNumbers.push(newNumber);

    // Update the display with the last called number
    updateFrequentNumberDisplay();

    // Change color of the newly called number circle
    const circleId = "circle" + newNumber;
    const circle = document.getElementById(circleId);
    if (circle) {
        circle.style.backgroundColor = "red"; // Change color to red or any other color you prefer
    }

    console.log("Called number:", newNumber);

    // Change color of all circles
    for (let i = 1; i <= 90; i++) {
        const circle = document.getElementById("circle" + i);
        if (circle && calledNumbers.includes(i)) {
            circle.style.backgroundColor = "red";
            circle.style.color = "white" // Change color to red or any other color you prefer
        }
    }
}

// Function to update the display with the last called number
function updateFrequentNumberDisplay() {
    const displayElement = document.getElementById('frequentNumberDisplay');
    const lastNumberIndex = calledNumbers.length - 1;
    displayElement.textContent = lastNumberIndex >= 0 ? `${calledNumbers[lastNumberIndex]}` : '-';
}
