const moment = require('moment');
var timestamp = moment().valueOf();

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: timestamp
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: timestamp
  };
};

module.exports = {generateMessage, generateLocationMessage};
