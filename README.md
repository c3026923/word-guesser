# word-guesser

A simple hangman type game, created using vanilla HTML, CSS and JavaScript.

# Instructions:
A random word will be selected each time you start the game but it is hidden, although it's length can be determined by counting the bullet point symbols which hide the word. You have eight guesses to try and uncover the word.

Enter a character (letter) into the 'Type a letter' box and click on the 'Take Guess' button. The page will update it's contents to let you know if you've entered a character which the chosen word contains.

If you enter a correct character, the page will update to say that you've entered a correct character, and the word will reveal at which positions that character is contained within the word.

If you enter an incorrect character, the page will update to say that you've entered an incorrect character and the word will not be updated. Instead, a list will update to allow you to keep track of the incorrect characters which you have attempted so far.

Finally, if you enter eight incorrect characters, you will fail the game and can no longer make any further guesses, though the page will reveal the word that you weren't able to correctly guess. 

You can restart the game with a newly assigned random word by pressing the 'Restart!' button once you have either successfully revealed the whole word, or depleted your incorrect character allowance.