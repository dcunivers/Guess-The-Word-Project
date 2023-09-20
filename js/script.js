const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const playAgainButton = document.querySelector(".play-again");
const message = document.querySelector(".message");

let word = "Magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch(
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await res.text();
    const wordArray = words.split("\n")
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
//start the game
getWord();

// Display symbols as a placeholder instead of text

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


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

//console.log(guessButton); 

//Checks inputs by person

const correctInputs = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //Is the input empty?
        message.innerText = "Please enter a letter";
    }
    else if (input.length > 1 ) {
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
        countRemainingGuesses (guess);
        guessedLettersBank();
        wordInProgressUpdate(guessedLetters);
    }
};

//shows the user where all the guessed letters go
const guessedLettersBank = function () {
    guessedLettersElement.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter; 
        guessedLettersElement.append(li);
    }
};

const wordInProgressUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealWord = [];
        for (const letter of wordArray) {
            if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
            } else {
            revealWord.push("●");
            }
        }
        wordInProgress.innerText = revealWord.join("");
        checkIfWon();
};

const countRemainingGuesses = function(guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        //incorrect guess, lose a chance
        message.innerText = `Sorry wrong guess!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `You're all out of guesses. The word was <span class ="highlight">${word}. </span> Thanks for playing!`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess remaining`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>.`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

    getWord();
    
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");

});