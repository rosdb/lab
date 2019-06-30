import Hangman from './hangman';
import getPuzzle from './requests';

import './_assets';

/* eslint-disable no-console */
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
let game1;

const render = () => {
  puzzleEl.innerHTML = '';
  guessesEl.textContent = game1.statusMessage;

  game1.puzzle.split('').forEach(letter => {
    const letterEl = document.createElement('span');
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });
};

window.addEventListener('keypress', evt => {
  const guess = String.fromCharCode(evt.charCode);
  game1.makeGuess(guess);
  render();
});

const startGame = async () => {
  // eslint-disable-next-line no-undef
  const puzzle = await getPuzzle('2');
  // eslint-disable-next-line no-undef
  game1 = new Hangman(puzzle, 5);
  render();
};

document.querySelector('#reset').addEventListener('click', startGame);

startGame();

// getPuzzle('2').then(puzzle => {
//   console.log(puzzle);
// }).catch(error => {
//   console.log(error);
// });

// getCurrentCountry().then(country => {
//   console.log(country);
// }).catch(error => {
//   console.log(error);
// });
