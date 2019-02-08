const moment = require("moment");

const VALID_VISA_NUM_LENGTH = 10;

function isNumberValid(visa) {
  return visa.number && visa.number.length === VALID_VISA_NUM_LENGTH;
}

function isDateFormatValid(visa) {
  return visa.date && visa.date.isValid();
}

function isWithinExpiry(visa) {
  let now = moment();
  let expiryDate = visa.date.clone().add(1, "years");
  return now.isBefore(expiryDate);
}

function isTagToPassport(visa, passport) {
  return visa.passportNumber === passport.number;
}

class VisaService {
  isValid(visa, passport) {
    return (
      visa &&
      isNumberValid(visa) &&
      isDateFormatValid(visa) &&
      isWithinExpiry(visa) &&
      isTagToPassport(visa, passport)
    );
  }
}

module.exports = VisaService;
