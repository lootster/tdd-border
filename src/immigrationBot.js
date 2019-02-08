const { passportService, visaService, messageService } = require("./service");

class ImmigrationBot {
  custom(passport, visa) {
    if (passportService.isValid(passport)) {
      if (
        passportService.isFromHorrorTown(passport) &&
        !visaService.isValid(visa)
      ) {
        return messageService.getRejectedMessage();
      }
      return messageService.getAllowedMessage();
    }
    return messageService.getRejectedMessage();
  }
}

module.exports = ImmigrationBot;
