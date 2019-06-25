/* eslint-disable no-unused-vars */
const getPuzzle = wordCount => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', evt => {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
      const data = JSON.parse(evt.target.responseText);
      resolve(data.puzzle);
    } else if (evt.target.readyState === 4) {
      reject('An error has taken place');
    }
  });

  request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
  request.send();
});

const getCountryDetails = code => new Promise((resolve, reject) => {
  const countryRequest = new XMLHttpRequest();

  countryRequest.addEventListener('readystatechange', evt => {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
      const data = JSON.parse(evt.target.responseText);
      const country = data.find(el => el.alpha2Code === code);
      // eslint-disable-next-line no-undefined
      resolve(country);
    } else if (evt.target.readyState === 4) {
      reject('Unable to fetch data');
    }
  });

  countryRequest.open('GET', 'http://restcountries.eu/rest/v2/all');
  countryRequest.send();
});
