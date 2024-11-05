const guessedLettersList = document.getElementById("already-guessed");
const guessButton = document.getElementById("button-guess");
const restartButton = document.getElementById("button-restart");
const labelType = document.getElementById("type-letter");
const inputLetter = document.getElementById("input-letter");
const wipWord = document.getElementById("wip-word");
const remainingGuessesElement = document.querySelector(".remaining-guesses");
const remainingGuessesText = document.querySelector('.remaining-guesses span');
const guess = "";
const message = document.getElementById("provide-message");

let word = "Rhinoceros";
let guessedChars = [];
let remainingGuesses = 8;

const generateWord = async function () 
{
    const response = await fetch('../words.txt');
    const words = await response.text();
    const wordArray = words.split(('\n'));
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    if (word.length > 8) 
    {
        generateWord();
    } 
    else 
    {
        failsafeWord(word);
    }
  };

const failsafeWord = function (word) 
{
    const wordArray = word.toUpperCase().split("");
    const placeholderLetters = [];
    
    wordArray.forEach(function (letter) 
    {
        placeholderLetters.push('•')
    });

    wipWord.innerText = placeholderLetters.join("");
}

generateWord();

guessButton.addEventListener("click", (e) => 
{
    e.preventDefault();
    message.innerText = "";
    const guess = inputLetter.value.toUpperCase();
    const acceptable = validate(guess);
    if (acceptable) 
    {
        applyGuess(guess);
    }
    inputLetter.value = '';
});

const showGuessedLetters = function () 
{
    guessedLettersList.innerHTML = "";

    for (const letter of guessedChars) 
    {
        const li = document.createElement('li');
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const validate = function (input) 
{
    const accepted = /[A-Z]/;
    if (input.length === 0) 
    {
        message.innerText = `Please enter a letter`;
        return;
    } 
    else if (input.length > 1) 
    {
        message.innerText = `Please enter a single letter`;
        return;
    } 
    else if (!input.match(accepted)) 
    {
        message.innerText = `Please only enter an alphabetical letter.`;
        return;
    } 
    else
    {
        return input;
    }
};

const applyGuess = function (guess) 
{
    if (guessedChars.includes(guess)) 
    {
        message.innerText = "You have already made that guess. Try a new letter.";
    } 
    else 
    {
        guessedChars.push(guess);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWord(guessedChars);
    }
};

const updateGuessesRemaining = function (guess) 
{
    const letterArray = word.toUpperCase().split("");
    if (!letterArray.includes(guess)) 
    {
        message.innerText = `Incorrect; the word does not contain ${guess}.`
        remainingGuesses -= 1;
    }
    else
    {
        message.innerText = `Yes! The word includes ${guess}.`
    }

    switch(remainingGuesses)
    {
        case 0:
            message.innerText = `GAME OVER. The word was ${word}`;
            endGame();
            break;
        default:
            remainingGuessesText.innerText = remainingGuesses;
            break;
    }
}

const updateWord = function (guessedLetters) 
{
    wordArray = word.toUpperCase().split("");
    const revealWord = [];
    for (const letter of wordArray) 
    {
        if (guessedLetters.includes(letter)) 
        {
            revealWord.push(letter.toUpperCase());
        } 
        else 
        {
            revealWord.push("•")
        }
    }
    wipWord.innerText = revealWord.join("");
    winCheck();
}
const winCheck = function () 
{
    if (word.toUpperCase() === wipWord.innerText) 
    {
        message.innerText = "Congratulations, you have won!"
        endGame();
    }
}
const endGame = function () 
{
    guessButton.classList.add('hidden');
    labelType.classList.add('hidden');
    inputLetter.classList.add('hidden');
    guessedLettersList.classList.add('hidden');
    remainingGuessesElement.classList.add('hidden');
    restartButton.classList.remove('hidden');
    restartButton.focus();
}

restartButton.addEventListener('click', function () 
{
    guessedChars = [];
    remainingGuesses = 8;
    remainingGuessesText.innerText = `${remainingGuesses}`;
    guessedLettersList.innerHTML = '';
    message.innerText = '';
    generateWord();
    guessButton.classList.remove('hidden');
    labelType.classList.remove('hidden');
    inputLetter.classList.remove('hidden');
    guessedLettersList.classList.remove('hidden');
    remainingGuessesElement.classList.remove('hidden');
    restartButton.classList.add('hidden');
    guessButton.focus();
  });