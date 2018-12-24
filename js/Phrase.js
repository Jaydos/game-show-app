class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    /**
        * Display phrase on game board
        */
    addPhraseToDisplay() {
        const splitPhrase = this.phrase.split(''); 
        for(let i = 0; i < splitPhrase.length; i++){
            let li = document.createElement('li');
            li.textContent = splitPhrase[i];
            splitPhrase[i] === ' ' ? li.className = 'hide space' : li.className = `hide letter ${splitPhrase[i]}`

            document.querySelector('#phrase ul').appendChild(li);
        }
    };

    /**
        * Checks if passed letter is in phrase
        * @param (string) letter - Letter to check
        */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    };

    /**
        * Displays passed letter on screen after a match is found
        * @param (string) letter - Letter to display
        */
    showMatchedLetter(letter) {
        const matches = document.querySelectorAll(`.${letter}`);

        matches.forEach((match) => {
            match.classList.remove('hide');
            match.classList.add('show');
        });    
    }
}
