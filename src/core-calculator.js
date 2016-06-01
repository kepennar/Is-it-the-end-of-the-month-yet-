const moment = require('moment');
const pluralize = require('pluralize');

exports.itIsTheEndOfTheMonth = function() {
  const m = moment();

  const currentDay = m.date();
  const endOfMonth = m.endOf('month');
  const interval = endOfMonth.date() - currentDay;

  let distanceMessage;
  if (interval === 0) {
    distanceMessage = 'It\s today !!!';
  } else if (interval < 15) {
    distanceMessage = `It is in ${interval} ${pluralize('day', interval)}`;

  } else if (interval > 15) {
    distanceMessage = `It was ${currentDay} ${pluralize('day', currentDay)} ago`;
  }

  return {
    response: interval < 2,
    distance: distanceMessage
  };
};
