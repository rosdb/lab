const Hangman = function (word, remainingGuesses) {
  this.word = word.toLowerCase().split('');
  this.remainingGuesses = remainingGuesses;
  this.guessedLetters = [];
  this.status = 'playing';
};


Hangman.prototype.updateStatus = function () {

  //let finished;
  //this.word.forEach(letter => {
  //if (this.guessedLetters.includes(letter)) {
  //finished = true;
  //} else {
  //finished = false;
  //}
  //});

  const finished = this.word.every(letter => this.guessedLetters.includes(letter));


  if (this.remainingGuesses === 0) {
    this.status = 'failed';
  } else if (finished) {
    this.status = 'finished';
  } else {
    this.status = 'playing';
  }

};

Hangman.prototype.getPuzzle = function () {
  let puzzle = '';

  this.word.forEach(letter => {
    if (this.guessedLetters.includes(letter) || letter === ' ') {
      puzzle += letter;
    } else {
      puzzle += '*';
    }
  });

  return puzzle;
};

Hangman.prototype.makeGuess = function (guess) {
  // eslint-disable-next-line no-param-reassign
  guess = guess.toLowerCase();
  const isUnique = !this.guessedLetters.includes(guess);
  const isBadGuess = !this.word.includes(guess);

  if (isUnique) {
    this.guessedLetters.push(guess);
  }

  if (isUnique && isBadGuess) {
    this.remainingGuesses = this.remainingGuesses - 1;
  }

  this.updateStatus();
};

