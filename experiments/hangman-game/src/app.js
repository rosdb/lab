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

//HTTP request
const request = new XMLHttpRequest();

request.addEventListener('readystatechange', evt => {
  if (evt.target.readyState === 4 && evt.target.status === 200) {
    const data = JSON.parse(evt.target.responseText);
    // eslint-disable-next-line no-console
    console.log(data);
  } else if (evt.target.readyState === 4) {
    // eslint-disable-next-line no-console
    console.log('error');
  }
});

request.open('GET', 'http://puzzle.mead.io/puzzle');
request.send();


const countryRequest = new XMLHttpRequest();

countryRequest.addEventListener('readystatechange', evt => {
  if (evt.target.readyState === 4 && evt.target.status === 200) {
    const data = JSON.parse(evt.target.responseText);
    const countryCode = 'IT';
    const country = data.find(el => el.alpha2Code === countryCode);
    // eslint-disable-next-line no-console
    console.log(country.name);
  } else if (evt.target.readyState === 4) {
    // eslint-disable-next-line no-console
    console.log('error');
  }
});

countryRequest.open('GET', 'http://restcountries.eu/rest/v2/all');
countryRequest.send();
