const Hangman = function (word, remainingGuesses) {
  this.word = word.toLowerCase().split('');
  this.remainingGuesses = remainingGuesses;
  this.guessedLetters = [];
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
};

const game1 = new Hangman('Cat', 2);

// eslint-disable-next-line
console.log(game1.getPuzzle());
// eslint-disable-next-line
console.log(game1.remainingGuesses);

window.addEventListener('keypress', evt => {
  const guess = String.fromCharCode(evt.charCode);
  game1.makeGuess(guess);
  // eslint-disable-next-line
  console.log(game1.getPuzzle());
  // eslint-disable-next-line
  console.log(game1.remainingGuesses);
});
