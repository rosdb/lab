/* eslint-disable no-unused-vars */
const getPuzzle = wordCount => fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then(response => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Unable to fetch puzzle');
  }
}).then(data => data.puzzle);



const getCountry = code => fetch('http://restcountries.eu/rest/v2/all').then(response => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Unable to fetch data');
  }
}).then(data => {
  const country = data.find(el => el.alpha2Code === code);
  return country.name;
});


const getLocation = () => fetch('https://ipinfo.io/json?token=721f4bba8f9ab6').then(response => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Unable to fetch location');
  }
}).then(data => data);
