module.exports = {
  root: true,
  rules: {
    'no-undef': 0,
    'no-shadow': 0,
  },
  parser: 'babel-eslint',
  globals: {
    document: true,
    window: true,
  },
};
