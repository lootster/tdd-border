const moment = require("moment");

const DATE_FORMAT = ["DD/MM/YYYY"];

class Visa {
  constructor(number, date, passportNumber) {
    this.number = number;
    this.date = moment(date, DATE_FORMAT);
    this.passportNumber = passportNumber
  }
}

module.exports = Visa;
