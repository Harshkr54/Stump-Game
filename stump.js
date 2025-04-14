// Initialize scores from localStorage or set to 0 if not present
let userWins = localStorage.getItem("userWins") ? parseInt(localStorage.getItem("userWins")) : 0;
let userLosses = localStorage.getItem("userLosses") ? parseInt(localStorage.getItem("userLosses")) : 0;
let computerWins = localStorage.getItem("computerWins") ? parseInt(localStorage.getItem("computerWins")) : 0;
let computerLosses = localStorage.getItem("computerLosses") ? parseInt(localStorage.getItem("computerLosses")) : 0;
let ties = localStorage.getItem("ties") ? parseInt(localStorage.getItem("ties")) : 0;

// Display stored scores on page load
updateScoreDisplay();

// Event listeners for buttons
document.getElementById("Bat").addEventListener("click", function() {
    playGame("Bat");
});

document.getElementById("Ball").addEventListener("click", function() {
    playGame("Ball");
});

document.getElementById("Stump").addEventListener("click", function() {
    playGame("Stump");
});

document.getElementById("Reset").addEventListener("click", function() {
    resetGame();
});

// Main game logic
function playGame(userChoice) {
    let choices = ["Bat", "Ball", "Stump"];
    let computerChoice = choices[Math.floor(Math.random() * 3)];
    let result;

    if (userChoice === computerChoice) {
        result = "It's a Tie! 🤝";
        ties++;
    } else if (
        (userChoice === "Bat" && computerChoice === "Ball") ||
        (userChoice === "Ball" && computerChoice === "Stump") ||
        (userChoice === "Stump" && computerChoice === "Bat")
    ) {
        result = "You Win! 🎉";
        userWins++;
        computerLosses++;
    } else {
        result = "Computer Wins! 🤖";
        computerWins++;
        userLosses++;
    }

    // Update UI
    document.querySelector(".result").innerText = `You: ${userChoice} | Computer: ${computerChoice} \n${result}`;
    
    // Store updated scores in localStorage
    localStorage.setItem("userWins", userWins);
    localStorage.setItem("userLosses", userLosses);
    localStorage.setItem("computerWins", computerWins);
    localStorage.setItem("computerLosses", computerLosses);
    localStorage.setItem("ties", ties);

    // Update scoreboard display
    updateScoreDisplay();
}

// Function to update score display
function updateScoreDisplay() {
    document.querySelector(".user-score").innerText = `User Wins: ${userWins} | User Losses: ${userLosses}`;
    document.querySelector(".computer-score").innerText = `Computer Wins: ${computerWins} | Computer Losses: ${computerLosses}`;
    document.querySelector(".tie-score").innerText = `Ties: ${ties}`;
}

// Reset game function
function resetGame() {
    userWins = 0;
    userLosses = 0;
    computerWins = 0;
    computerLosses = 0;
    ties = 0;

    // Clear localStorage
    localStorage.removeItem("userWins");
    localStorage.removeItem("userLosses");
    localStorage.removeItem("computerWins");
    localStorage.removeItem("computerLosses");
    localStorage.removeItem("ties");

    // Update UI
    document.querySelector(".result").innerText = "Result";
    updateScoreDisplay();
}
