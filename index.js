"use strict";
const inquirer = require("inquirer");
const chalk = require("chalk");
const Word = require("./Word");
const randomWord = require("./hangmanWords");

var hangmanWord, maxTry, tries, alreadyGuessed, lastCorrectGuesses;

function guessLetter(depth) {
  if (depth == 0) {
    hangmanWord = new Word(randomWord());
    maxTry = hangmanWord.length * 2;
    tries = 0;
    alreadyGuessed = {};
    lastCorrectGuesses = 0;
    console.log("New word");
  }

  console.log("\n" + chalk.inverse(hangmanWord.value()));

  inquirer
    .prompt([{ type: "input", message: "guess a letter", name: "letter" }])
    .then(function(rsp) {
      const letter = rsp.letter;
      console.log(`letter: ${letter}`);
      if (!letter.match(/^[a-z]$/i)) {
        console.log("a single alphabetic letter please, try again");
        guessLetter(depth + 1);
        return;
      }
      if (alreadyGuessed[letter]) {
        console.log("You've already guessed that letter, try again");
        guessLetter(depth + 1);
        return;
      }
      alreadyGuessed[letter] = true;
      const correctGuesses = hangmanWord.guess(letter);
      console.log(chalk.inverse(hangmanWord.value()));
      if (correctGuesses == hangmanWord.length) {
        console.log("You've got it right!");
        guessLetter(0);
        return;
      }
      if (correctGuesses > lastCorrectGuesses) {
        lastCorrectGuesses = correctGuesses;
        console.log(chalk.green("CORRECT!!"));
        guessLetter(depth + 1);
        return;
      }
      tries++;
      if (tries == maxTry) {
        console.log("Sorry, no more guesses.");
        console.log("The movie name was:");
        hangmanWord.solve();
        console.log(chalk.inverse(hangmanWord.value()));
        console.log("Try again");
        guessLetter(0);
        return;
      }
      console.log(chalk.red("INCORRECT!!"));
      console.log(`You have ${maxTry - tries} more guesses`);
      guessLetter(depth + 1);
    });
}

console.log("Movie Hangman!")
guessLetter(0);
