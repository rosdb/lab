
const getPuzzle = async wordCount => {
  const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error('Unable to fetch puzzle');
  }
};



const getCountry = async code => {
  const response = await fetch('http://restcountries.eu/rest/v2/all');
  if (response.status === 200) {
    const data = await response.json();
    const country = await data.find(el => el.alpha2Code === code);
    return country.name;
  } else {
    throw new Error('Unable to fetch data');
  }
};


const getLocation = async () => {
  const response = await fetch('https://ipinfo.io/json?token=721f4bba8f9ab6');
  if (response.status === 200) {
    const data = response.json();
    return data;
  } else {
    throw new Error('Unable to fetch location');
  }
};
