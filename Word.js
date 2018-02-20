"use strict";
const Letter = require("./Letter");

class Word {
    constructor(word) {
        this.length = word.length;
        this.letterArr = [];
        word.split("").forEach(letter => {
            this.letterArr.push(new Letter(letter));
        });
    };

    guess(guessLetter) {
        return this.letterArr.reduce((count, letter) => {
            if (letter.guess(guessLetter)) { count++ } return count;
        }, Number(0));
    };

    value() {
        return this.letterArr.map(letter => letter.value()).join(" ");
    };

    solve() {
        this.letterArr.forEach(letter => { letter.guessed = true });
    };
};

module.exports = Word;