/* eslint-disable no-unused-vars */
const getPuzzle = callback => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', evt => {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
      const data = JSON.parse(evt.target.responseText);
      // eslint-disable-next-line no-undefined
      callback(undefined, data.puzzle);
    } else if (evt.target.readyState === 4) {
      callback('Erroreeee!');
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle');
  request.send();
};

const getCountryDetails = (code, callback) => {
  const countryRequest = new XMLHttpRequest();

  countryRequest.addEventListener('readystatechange', evt => {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
      const data = JSON.parse(evt.target.responseText);
      const country = data.find(el => el.alpha2Code === code);
      // eslint-disable-next-line no-undefined
      callback(undefined, country);
    } else if (evt.target.readyState === 4) {
      callback('Unable to fetch data');
    }
  });

  countryRequest.open('GET', 'http://restcountries.eu/rest/v2/all');
  countryRequest.send();
};
