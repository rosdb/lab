// eslint-disable-next-line no-unused-vars
const getPuzzle = async wordCount => {
  const response = await fetch(
    `//puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );
  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  }
  throw new Error('Unable to fetch puzzle');
};

const getCountry = async code => {
  const response = await fetch('//restcountries.eu/rest/v2/all');
  if (response.status === 200) {
    const data = await response.json();
    const country = await data.find(el => el.alpha2Code === code);
    return country.name;
  }
  throw new Error('Unable to fetch data');
};

const getLocation = async () => {
  const response = await fetch('//ipinfo.io/json?token=721f4bba8f9ab6');
  if (response.status === 200) {
    const data = response.json();
    return data;
  }
  throw new Error('Unable to fetch location');
};

// eslint-disable-next-line no-unused-vars
const getCurrentCountry = async () => {
  const location = await getLocation();
  return getCountry(location.country);
};
