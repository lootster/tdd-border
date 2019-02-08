const sinon = require("sinon");
const ImmigrationBot = require("../src/immigrationBot");
const Passport = require("../src/model/passport");
const Visa = require("../src/model/visa");

test('should return message "Rejected" if there is no passport', () => {
  let bot = new ImmigrationBot();
  let message = bot.custom();
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if there is no country', () => {
  let passport = new Passport(null);
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if there is no passport number', () => {
  let passport = new Passport("Wonderland", null);
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if passport number is not 8 digits', () => {
  let passport = new Passport("Wonderland", "1234567");
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if there is no fullname', () => {
  let passport = new Passport("Wonderland", "12345678", null);
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if fullname is not a type of string', () => {
  let passport = new Passport("Wonderland", "12345678", 12345678);
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if there is no date of emission', () => {
  let passport = new Passport("Wonderland", "12345678", "Sheldon", null);
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if date of emission format is invalid', () => {
  let passport = new Passport("Wonderland", "12345678", "Sheldon", "31/Jan /2019");
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  expect(message).toBe("Rejected");
});

test('should return message "Allowed" if passport is valid', () => {
  let passport = new Passport(
    "Wonderland",
    "12345678",
    "Sheldon",
    "31/01/2019"
  );
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  expect(message).toBe("Allowed");
});

test('should return message "Rejected" if passport is expired (more than 10 years)', () => {
  const date = sinon.useFakeTimers({ now: 1548912600000 }); // 01/01/2019
  let passport = new Passport(
    "Wonderland",
    "12345678",
    "Sheldon",
    "01/01/2008"
  );
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  date.restore();
  expect(message).toBe("Rejected");
});

test('should return message "Allowed" if passport is valid and not expired', () => {
  const date = sinon.useFakeTimers({ now: 1548912600000 }); // 01/01/2019
  let passport = new Passport(
    "Wonderland",
    "12345678",
    "Sheldon",
    "01/01/2010"
  );
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  date.restore();
  expect(message).toBe("Allowed");
});

test('should return message "Rejected" if passport is from "HorrorTown" but without a visa ', () => {
  const date = sinon.useFakeTimers({ now: 1548912600000 }); // 01/01/2019
  let passport = new Passport(
    "HorrorTown",
    "12345678",
    "Sheldon",
    "01/01/2010"
  );
  let bot = new ImmigrationBot();
  let message = bot.custom(passport);
  date.restore();
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if passport is from "HorrorTown" and visa has no number', () => {
  const date = sinon.useFakeTimers({ now: 1548912600000 }); // 01/01/2019
  let passport = new Passport(
    "HorrorTown",
    "12345678",
    "Sheldon",
    "01/01/2010"
  );
  let visa = new Visa(null);
  let bot = new ImmigrationBot();
  let message = bot.custom(passport, visa);
  date.restore();
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if passport is from "HorrorTown" and visa number is not 10 digits', () => {
  const date = sinon.useFakeTimers({ now: 1548912600000 }); // 01/01/2019
  let passport = new Passport(
    "HorrorTown",
    "12345678",
    "Sheldon",
    "01/01/2010"
  );
  let visa = new Visa("123456789");
  let bot = new ImmigrationBot();
  let message = bot.custom(passport, visa);
  date.restore();
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if passport is from "HorrorTown" and visa has no date', () => {
  const date = sinon.useFakeTimers({ now: 1548912600000 }); // 01/01/2019
  let passport = new Passport(
    "HorrorTown",
    "12345678",
    "Sheldon",
    "01/01/2010"
  );
  let visa = new Visa("0123456789", null);
  let bot = new ImmigrationBot();
  let message = bot.custom(passport, visa);
  date.restore();
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if passport is from "HorrorTown" and visa date format is invalid', () => {
  const date = sinon.useFakeTimers({ now: 1548912600000 }); // 01/01/2019
  let passport = new Passport(
    "HorrorTown",
    "12345678",
    "Sheldon",
    "01/01/2010"
  );
  let visa = new Visa("0123456789", "31/Jan/2019");
  let bot = new ImmigrationBot();
  let message = bot.custom(passport, visa);
  date.restore();
  expect(message).toBe("Rejected");
});

test('should return message "Rejected" if passport is from "HorrorTown" and visa is expired (more than 1 year)', () => {
  const date = sinon.useFakeTimers({ now: 1548912600000 }); // 01/01/2019
  let passport = new Passport(
    "HorrorTown",
    "12345678",
    "Sheldon",
    "01/01/2010"
  );
  let visa = new Visa("0123456789", "01/01/2017");
  let bot = new ImmigrationBot();
  let message = bot.custom(passport, visa);
  date.restore();
  expect(message).toBe("Rejected");
});

test('should return message "Allowed" if passport is from "HorrorTown" and visa is valid', () => {
  const date = sinon.useFakeTimers({ now: 1548912600000 }); // 01/01/2019
  let passport = new Passport(
    "HorrorTown",
    "12345678",
    "Sheldon",
    "01/01/2010"
  );
  let visa = new Visa("0123456789", "01/01/2019");
  let bot = new ImmigrationBot();
  let message = bot.custom(passport, visa);
  date.restore();
  expect(message).toBe("Allowed");
});
