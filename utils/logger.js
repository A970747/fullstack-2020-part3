const info = (...params) => {
  console.log(...params); // eslint-disable-line
};

const error = (...params) => {
  console.error(...params); // eslint-disable-line
};

module.exports = {
  info, error,
};
