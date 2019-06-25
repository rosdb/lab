/* eslint-disable no-console */
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
let game1;


window.addEventListener('keypress', evt => {
  const guess = String.fromCharCode(evt.charCode);
  game1.makeGuess(guess);
  render();
});

const render = () => {
  puzzleEl.innerHTML = '';
  guessesEl.textContent = game1.statusMessage;

  game1.puzzle.split('').forEach(letter => {
    const letterEl = document.createElement('span');
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });
};

const startGame = async () => {
  const puzzle = await getPuzzle('2');
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




