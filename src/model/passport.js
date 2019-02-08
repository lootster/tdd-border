const moment = require("moment");

const DATE_FORMAT = ["DD/MM/YYYY"];

class Passport {
  constructor(country, number, fullname, dateOfEmission) {
    this.country = country;
    this.number = number;
    this.fullname = fullname;
    this.dateOfEmission = moment(dateOfEmission, DATE_FORMAT);
  }
}

module.exports = Passport;
