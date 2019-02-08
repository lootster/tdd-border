const ALLOWED_MESSAGE = "Allowed";
const REJECTED_MESSAGE = "Rejected";

class MessageService {
  getAllowedMessage() {
    return ALLOWED_MESSAGE;
  }
  getRejectedMessage() {
    return REJECTED_MESSAGE;
  }
}

module.exports = MessageService;
