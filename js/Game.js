class Game {
    constructor(){
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }
    /**
        * Creates phrases for use in game
        * @return {array} An array of phrases that could be used in the game 
        */
    
    createPhrases(){
        return [
            new Phrase('Testing'), 
            new Phrase('Is This Thing On'),
            new Phrase('You Win'),
            new Phrase('Hello World'),
            new Phrase('Never Gonna Give You Up')
        ]    
    };

    /**
        * Selects random phrase from phrases property
        * @return {Object} Phrase object chosen to be used
        */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    };

    /**
        * Begins game by selecting a random phrase and displaying it to user
        */
    startGame(){
        document.querySelector('#overlay').style.display = 'none';

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    /**
        * Checks for winning move
        * @return {boolean} True if game has been won, false if game wasn't
        won */
    checkForWin() {
        return document.querySelector('.hide.letter') === null;
    };

    /**
        * Increases the value of the missed property
        * Removes a life from the scoreboard
        * Checks if player has remaining lives and ends game if player is out
        */
    removeLife() {
        const scoreboard = document.querySelector('#scoreboard ol');
        this.missed++;

        scoreboard.children[this.missed -1].firstChild.src = 'images/lostHeart.png';

        if(this.missed === 5){
            this.gameOver(false);
        }
    };

    /**
        * Displays game over message
            * @param {boolean} gameWon - Whether or not the user won the game
        */
    gameOver(gameWon) {

        const message = document.querySelector('#game-over-message');

        if(gameWon){
            message.textContent = 'Great Job!';
            overlay.className = 'win';
        } else {
            message.textContent = 'Sorry. Try Again!';
            overlay.className = 'lose';
        }

        newGameButton.textContent = 'Play Again?';
        overlay.style.display = '';
    };

    /**
        * Handles onscreen keyboard button clicks
        * @param (HTMLButtonElement) button - The clicked button element
        */
    handleInteraction(button) {
        button.disabled = true;
        
        if(!this.activePhrase.checkLetter(button.textContent)){
            button.classList.add('wrong');
            this.removeLife();
        } else {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.textContent);
            
            if(this.checkForWin()){
                this.gameOver(true);
            }    
        }
    };
    /**
        * Remove all 'li' elements from the Phrase 'ul' element
        * Enable onscreen keyboard buttons and update each to use the 'key' CSS class
        * Reset all heart images
        * Reset score
        */
    resetGameBoard(){
        document.querySelector('#phrase ul').innerHTML = '';

        keyboardButtons.forEach((button) =>{
            button.disabled = false;
            button.classList.remove('chosen');
            button.classList.remove('wrong');
            button.classList.add('key');
        });

        for(let i = 0; i < scoreboard.children.length; i++){
            scoreboard.children[i].firstChild.src = 'images/liveHeart.png'
        };
    }
}