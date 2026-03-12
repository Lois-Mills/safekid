const { validateRegistration, validateRide } = require("../app");

test("validateRegistration returns true for valid data", () => {
  const data = {
    parentName: "Patience Donkor",
    email: "pa@example.com",
    phone: "0241234567",
    childName: "Kwame"
  };

  expect(validateRegistration(data)).toBe(true);
});

test("validateRegistration returns false for invalid email", () => {
  const data = {
    parentName: "Patience Donkor",
    email: "paexample.com",
    phone: "0241234567",
    childName: "Kwame"
  };

  expect(validateRegistration(data)).toBe(false);
});

test("validateRide returns true for valid ride data", () => {
  const data = {
    pickupLocation: "Ashesi School Gate",
    homeAddress: "Madina Zongo Junction",
    pickupDate: "2026-03-15",
    pickupTime: "15:30"
  };

  expect(validateRide(data)).toBe(true);
});

test("validateRide returns false when fields are missing", () => {
  const data = {
    pickupLocation: "",
    homeAddress: "Madina Zongo Junction",
    pickupDate: "2026-03-15",
    pickupTime: "15:30"
  };

  expect(validateRide(data)).toBe(false);
});