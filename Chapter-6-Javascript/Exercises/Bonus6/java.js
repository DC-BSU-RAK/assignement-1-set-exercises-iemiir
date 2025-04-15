// Game state variables
let currentRgb; // Stores the current RGB value to guess
let lives = 3; // Initial number of lives
let score = 0; // Initial score
let correctOptionIndex; // Index of the correct option
let difficultyLevel = 'easy'; // Default difficulty
let colorCount = 3; // Number of color options to display

// DOM elements
const rgbValueElement = document.getElementById('rgb-value');
const colorOptionsContainer = document.getElementById('color-options');
const messageElement = document.getElementById('message');
const livesCountElement = document.getElementById('lives-count');
const scoreCountElement = document.getElementById('score-count');
const nextButton = document.getElementById('next-btn');
const gameOverModal = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again-btn');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// Generate a random RGB color
function generateRandomRgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

// Format RGB object to string
function formatRgb(rgb) {
    return `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

// Set difficulty level and update the game
function setDifficulty(difficulty) {
    difficultyLevel = difficulty;
    
    // Update active class on buttons
    difficultyButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });
    
    // Set color count based on difficulty
    switch(difficulty) {
        case 'easy':
            colorCount = 3;
            break;
        case 'medium':
            colorCount = 6;
            break;
        case 'hard':
            colorCount = 9;
            break;
    }
    
    // Reset game with new difficulty
    setupNewRound();
}

// Generate color options
function generateColorOptions() {
    // Clear previous options
    colorOptionsContainer.innerHTML = '';
    
    // Generate random colors
    const colors = [];
    for (let i = 0; i < colorCount; i++) {
        colors.push(generateRandomRgb());
    }
    
    // Randomly select one as correct answer
    correctOptionIndex = Math.floor(Math.random() * colorCount);
    currentRgb = colors[correctOptionIndex];
    
    // Display RGB value to guess
    rgbValueElement.textContent = formatRgb(currentRgb);
    
    // Create color option elements
    colors.forEach((color, index) => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        
        // Add click event listener
        colorOption.addEventListener('click', () => checkAnswer(index));
        
        // Add to container
        colorOptionsContainer.appendChild(colorOption);
    });
}

// Check if the answer is correct
function checkAnswer(selectedIndex) {
    // Disable further clicking until next round
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    if (selectedIndex === correctOptionIndex) {
        // Correct answer
        messageElement.textContent = 'Correct!';
        messageElement.className = 'message correct';
        score += 1;
        scoreCountElement.textContent = score;
        
        // Highlight correct answer
        colorOptions[correctOptionIndex].style.border = '4px solid #2ecc71';
    } else {
        // Wrong answer
        messageElement.textContent = 'Wrong! Try again.';
        messageElement.className = 'message incorrect';
        lives -= 1;
        livesCountElement.textContent = lives;
        
        // Add shake animation to body
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
        
        // Mark incorrect and show correct answer
        colorOptions[selectedIndex].style.border = '4px solid #e74c3c';
        colorOptions[correctOptionIndex].style.border = '4px solid #2ecc71';
        
        // Check if game over
        if (lives <= 0) {
            endGame();
        }
    }
    
    // Show next button
    nextButton.style.display = 'inline-block';
}

// Setup new round
function setupNewRound() {
    // Clear message
    messageElement.textContent = '';
    messageElement.className = 'message';
    
    // Generate new color options
    generateColorOptions();
}

// End the game
function endGame() {
    // Show game over modal
    gameOverModal.classList.add('active');
    finalScoreElement.textContent = score;
}

// Reset the game
function resetGame() {
    // Reset game state
    lives = 3;
    score = 0;
    
    // Update UI
    livesCountElement.textContent = lives;
    scoreCountElement.textContent = score;
    
    // Hide game over modal
    gameOverModal.classList.remove('active');
    
    // Start new round
    setupNewRound();
}

// Event listeners
nextButton.addEventListener('click', setupNewRound);
playAgainButton.addEventListener('click', resetGame);

// Set difficulty buttons
difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setDifficulty(btn.dataset.difficulty);
    });
});

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    resetGame();
});