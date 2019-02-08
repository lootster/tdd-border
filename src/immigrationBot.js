const { passportService, visaService, messageService } = require("./service");

class ImmigrationBot {
  custom(passport, visa) {
    if (
      passportService.isValid(passport) &&
      (!passportService.isVisaNeeded(passport) ||
        visaService.isValid(visa, passport))
    ) {
      return messageService.getAllowedMessage();
    }
    return messageService.getRejectedMessage();
  }
}

module.exports = ImmigrationBot;
