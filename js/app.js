let game;

// Target and store all keyboard buttons and scoreboard list for later use
const keyboardButtons = document.querySelectorAll('.key');
const scoreboard = document.querySelector('#scoreboard ol');

// newGame function to initialise a new game
const newGame = () => {
    game = new Game();
    game.resetGameBoard();
    game.startGame();
}

// Start new game when start button is clicked
document.querySelector('#btn__reset').addEventListener('click', () => {
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
    /* If key pressed is 'Enter' and game either hasn't started or has finished (won or lost),
       start a new game 
    */
    if(e.key === 'Enter' && game === undefined || game.missed === 5 || game.checkForWin()){
        newGame();
    }    
    
    // If game has been initialised
    if(game !== undefined){

        // Handle interaction with button that matches key that is pressed
        keyboardButtons.forEach((button) => {
            if(button.textContent === e.key){
                game.handleInteraction(button)
            }
        });
    } 
});