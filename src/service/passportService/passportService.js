const moment = require("moment");

const VALID_PASSPORT_NUM_LENGTH = 8;
const VALID_COUNTRY_WONDERLAND = "Wonderland";
const VALID_COUNTRY_MARVELCOUNTY = "MarvelCounty";
const VALID_COUNTRY_HORRORTOWN = "HorrorTown";
const VALID_STRING = "string";

function isCountryValid(passport) {
  return (
    passport.country &&
    (passport.country === VALID_COUNTRY_WONDERLAND ||
      passport.country === VALID_COUNTRY_MARVELCOUNTY ||
      passport.country === VALID_COUNTRY_HORRORTOWN)
  );
}

function isNumberValid(passport) {
  return (
    passport.number && passport.number.length === VALID_PASSPORT_NUM_LENGTH
  );
}

function isDateFormatValid(passport) {
  return passport.dateOfEmission && passport.dateOfEmission.isValid();
}

function isFullNameValid(passport) {
  return typeof passport.fullname === VALID_STRING;
}

function isWithinExpiry(passport) {
  let now = moment();
  let expiryDate = passport.dateOfEmission.clone().add(10, "years");
  return now.isBefore(expiryDate);
}

class PassportService {
  isValid(passport) {
    return (
      passport &&
      isCountryValid(passport) &&
      isNumberValid(passport) &&
      isFullNameValid(passport) &&
      isDateFormatValid(passport) &&
      isWithinExpiry(passport)
    );
  }

  isFromHorrorTown(passport) {
    return passport.country && passport.country === VALID_COUNTRY_HORRORTOWN;
  }
}

module.exports = PassportService;
