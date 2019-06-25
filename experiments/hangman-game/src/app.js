/* eslint-disable no-console */
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

getPuzzle('2').then(puzzle => {
  console.log(puzzle);
}).catch(error => {
  console.log(error);
});


getCountry('IT').then(country => {
  console.log(country);
}).catch(error => {
  console.log(error);
});

getLocation().then(location => {
  console.log(`You are currently in ${location.city}, ${location.region} - ${location.country}`);
}).catch(error => {
  console.log(error);
});


