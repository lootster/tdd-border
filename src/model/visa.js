const moment = require("moment");

const DATE_FORMAT = ["DD/MM/YYYY"];

class Visa {
  constructor(number, date) {
    this.number = number;
    this.date = moment(date, DATE_FORMAT);
  }
}

module.exports = Visa;
