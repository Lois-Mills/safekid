const {
  validateRegistration,
  validateRide,
  validateDriverRegistration,
  validateChildVerification
} = require("../app");

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

test("validateDriverRegistration returns true for valid driver data", () => {
  const data = {
    driverName: "Kwesi Mensah",
    driverPhone: "0241111111",
    licenseNumber: "LIC12345",
    driverLicenseName: "license.pdf"
  };

  expect(validateDriverRegistration(data)).toBe(true);
});

test("validateDriverRegistration returns false if file is missing", () => {
  const data = {
    driverName: "Kwesi Mensah",
    driverPhone: "0241111111",
    licenseNumber: "LIC12345",
    driverLicenseName: ""
  };

  expect(validateDriverRegistration(data)).toBe(false);
});

test("validateChildVerification returns true for valid child verification data", () => {
  const data = {
    childName: "Ama",
    childImageName: "ama.jpg",
    verificationCode: "SAFE123"
  };

  expect(validateChildVerification(data)).toBe(true);
});

test("validateChildVerification returns false when verification code is missing", () => {
  const data = {
    childName: "Ama",
    childImageName: "ama.jpg",
    verificationCode: ""
  };

  expect(validateChildVerification(data)).toBe(false);
});
