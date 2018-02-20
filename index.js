"use strict";
const inquirer = require("inquirer");
const Word = require("./Word");
const randomWord = require("./hangmanWords");

var hangmanWord, maxTry, tries, alreadyGuessed, lastCorrectGuesses;


async function guessLetter() {
    console.log(hangmanWord.value());

    inquirer.prompt([{ type: "input", message: "guess a letter", name: "letter" }])
        .then(rsp => {

            console.log(`letter: ${letter}`);
            if (!letter.match(/^[a-z]$/i)) {
                console.log("a single alphabetic letter please, try again")
                guessLetter();
                return;
            }
            if (alreadyGuessed[letter]) {
                console.log("You've already guessed that letter, try again");
                guessLetter();
                return;
            }
            alreadyGuessed[letter] = true;
            const correctGuesses = hangmanWord.guess(letter);
            console.log(hangmanWord.value());
            if (correctGuesses == hangmanWord.length) {
                console.log("You've got it right! Next word");
                return;
            }
            if (correctGuesses > lastCorrectGuesses) {
                lastCorrectGuesses = correctGuesses;
                console.log("CORRECT!!")
                guessLetter();
                return;
            }
            tries++;
            if (tries == maxTry) {
                console.log("Sorry, no more guesses.");
                console.log("The word was:");
                hangmanWord.solve();
                console.log(hangmanWord.value());
                console.log("Try again");
                return;
            }
            console.log("INCORRECT!!");
            console.log(`You have ${maxTry - tries} more guesses`);
            guessLetter();
        });
}

//while (true) 
{
    hangmanWord = new Word(randomWord());
    maxTry = hangmanWord.length * 2;
    tries = 0;
    alreadyGuessed = {};
    lastCorrectGuesses = 0;
    guessLetter();
}