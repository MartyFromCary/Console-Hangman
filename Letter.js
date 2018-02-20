"use strict";

class Letter {
    
  constructor(letter) {
    this.letter = letter;
    this.guessed = false;
    if (!letter.match(/^[a-z]$/i)) {
      this.guessed = true;
    }
  }

  guess(letter) {
    if (!this.guessed) {
      this.guessed = this.letter.toUpperCase() === letter.toUpperCase();
    }
    return this.guessed;
  }

  value() {
    return this.guessed ? this.letter : "_";
  }
}

module.exports = Letter;
