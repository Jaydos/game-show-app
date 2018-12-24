let game;

// Target and store all keyboard buttons and scoreboard list for later use
const keyboardButtons = document.querySelectorAll('.key');
const scoreboard = document.querySelector('#scoreboard ol');
const newGameButton = document.querySelector('#btn__reset');
const overlay = document.querySelector('#overlay');

// newGame function to initialise a new game
const newGame = () => {
    game = new Game();
    game.resetGameBoard();
    game.startGame();
}

// Start new game when start button is clicked
newGameButton.addEventListener('click', () => {
    newGame();
});

// Add event listeners to onscreen keyboard buttons and handle interaction
keyboardButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        game.handleInteraction(e.target);
    })
});

// Add event listener for any keypress
window.addEventListener('keypress', (e) => {
    
    // Only handle keypress providing a new game has started
    if(overlay.style.display === 'none'){

        // Handle interaction with button that matches key that is pressed
        keyboardButtons.forEach((button) => {
            if(button.textContent === e.key && !button.disabled){
                game.handleInteraction(button)
            }
        });
    } 
});