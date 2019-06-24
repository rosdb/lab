const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat', 2);

puzzleEl.textContent = game1.puzzle;
guessesEl.textContent = game1.statusMessage;


window.addEventListener('keypress', evt => {
  const guess = String.fromCharCode(evt.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});

//HTTP requests

getPuzzle((error, puzzle) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } else {
    // eslint-disable-next-line no-console
    console.log(puzzle);
  }
});


getCountryDetails('IT', (error, country) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } else {
    // eslint-disable-next-line no-console
    console.log(country.name);
  }
});
