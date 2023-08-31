const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const guessedLetterBank = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide");
const message = document.querySelector(".message");

const word = "Magnolia";
const guessedLetters = [];

// Display symbols as a placeholder instead of text

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    //empty message paragraph
    message.innerText = "";

    //Let's grab what was entered in the input
    const guess = guessInput.value;
    
    const goodGuess = correctInputs(guess)
    guessInput.value = "";
    
    if (goodGuess) {
        makeGuess(guess);
    }
    guessInput.value = "";
});

console.log(guessButton); 

//Checks inputs by person

const correctInputs = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //Is the input empty?
        message.innerText = "Please enter a letter";
    }
    else if (input.lenghth > 1 ) {
        // Did you type more than one letter?
        message.innerText = "Please type a single letter";
    }
    else if (!input.match(acceptedLetter)) {
        // Did you type a number, letter, or special character?
        message.innerText = "Please enter a letter from A to Z";
    }
    else {
        // finally a single letter
        return input;
    }
};

//Captures input

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You already guessed that letter! Try again.`
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};