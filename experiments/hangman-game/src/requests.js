/* eslint-disable no-unused-vars */
const getPuzzle = callback => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', evt => {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
      const data = JSON.parse(evt.target.responseText);
      // eslint-disable-next-line no-undefined
      callback(undefined, data.puzzle);
    } else if (evt.target.readyState === 4) {
      // eslint-disable-next-line no-undefined
      callback('Erroreeee!', undefined);
    }
  });

  request.open('GET', 'http://puzzle.mead.io/puzzle');
  request.send();
};
