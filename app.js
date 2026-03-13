function validateRegistration(data) {
  return (
    data.parentName.trim() !== "" &&
    data.email.includes("@") &&
    data.phone.trim() !== "" &&
    data.childName.trim() !== ""
  );
}

function validateRide(data) {
  return (
    data.pickupLocation.trim() !== "" &&
    data.homeAddress.trim() !== "" &&
    data.pickupDate.trim() !== "" &&
    data.pickupTime.trim() !== ""
  );
}

function validateDriverRegistration(data) {
  return (
    data.driverName.trim() !== "" &&
    data.driverPhone.trim() !== "" &&
    data.licenseNumber.trim() !== "" &&
    data.driverLicenseName.trim() !== ""
  );
}

function validateChildVerification(data) {
  return (
    data.childName.trim() !== "" &&
    data.childImageName.trim() !== "" &&
    data.verificationCode.trim() !== ""
  );
}
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function updatePreview() {
  const preview = document.getElementById("dataPreview");
  const parentData = getFromLocalStorage("parentData");
  const rideData = getFromLocalStorage("rideData");
  const driverData = getFromLocalStorage("driverData");
  const childVerificationData = getFromLocalStorage("childVerificationData");

  preview.innerHTML = "";

  if (parentData) {
    preview.innerHTML += `
      <div class="preview-box">
        <h3>Registered Parent</h3>
        <p><strong>Name:</strong> ${parentData.parentName}</p>
        <p><strong>Email:</strong> ${parentData.email}</p>
        <p><strong>Phone:</strong> ${parentData.phone}</p>
        <p><strong>Child:</strong> ${parentData.childName}</p>
      </div>
    `;
  }

  if (rideData) {
    preview.innerHTML += `
      <div class="preview-box">
        <h3>Scheduled Ride</h3>
        <p><strong>Pickup:</strong> ${rideData.pickupLocation}</p>
        <p><strong>Home:</strong> ${rideData.homeAddress}</p>
        <p><strong>Date:</strong> ${rideData.pickupDate}</p>
        <p><strong>Time:</strong> ${rideData.pickupTime}</p>
      </div>
    `;
  }
    if (driverData) {
    preview.innerHTML += `
      <div class="preview-box">
        <h3>Registered Driver</h3>
        <p><strong>Name:</strong> ${driverData.driverName}</p>
        <p><strong>Phone:</strong> ${driverData.driverPhone}</p>
        <p><strong>License Number:</strong> ${driverData.licenseNumber}</p>
        <p><strong>License File:</strong> ${driverData.driverLicenseName}</p>
      </div>
    `;
  }

  if (childVerificationData) {
    preview.innerHTML += `
      <div class="preview-box">
        <h3>Child Verification</h3>
        <p><strong>Child Name:</strong> ${childVerificationData.childName}</p>
        <p><strong>Image File:</strong> ${childVerificationData.childImageName}</p>
        <p><strong>Verification Code:</strong> ${childVerificationData.verificationCode}</p>
      </div>
    `;
  }


  if (!parentData && !rideData && !driverData && !childVerificationData) {
    preview.innerHTML = "<p>No data saved yet.</p>";
  }
}

if (typeof document !== "undefined") {
  const registerForm = document.getElementById("registerForm");
  const rideForm = document.getElementById("rideForm");
  const driverForm = document.getElementById("driverForm");
  const childVerificationForm = document.getElementById("childVerificationForm");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      parentName: document.getElementById("parentName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      childName: document.getElementById("childName").value
    };

    const message = document.getElementById("registerMessage");

    if (validateRegistration(data)) {
      saveToLocalStorage("parentData", data);
      message.textContent = "Parent registered successfully.";
      registerForm.reset();
      updatePreview();
    } else {
      message.textContent = "Please fill in all registration fields correctly.";
      message.style.color = "red";
    }
  });

  driverForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const licenseFile = document.getElementById("driverLicense").files[0];

    const data = {
      driverName: document.getElementById("driverName").value,
      driverPhone: document.getElementById("driverPhone").value,
      licenseNumber: document.getElementById("licenseNumber").value,
      driverLicenseName: licenseFile ? licenseFile.name : ""
    };

    const message = document.getElementById("driverMessage");

    console.log("Driver registration submitted:", data);

    if (validateDriverRegistration(data)) {
      saveToLocalStorage("driverData", data);
      message.textContent = "Driver registered successfully.";
      message.style.color = "green";
      driverForm.reset();
      updatePreview();
    } else {
      console.error("Driver registration failed validation.");
      message.textContent = "Please complete all driver registration fields correctly.";
      message.style.color = "red";
    }
  });

  childVerificationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const childImageFile = document.getElementById("childImage").files[0];

    const data = {
      childName: document.getElementById("verifyChildName").value,
      childImageName: childImageFile ? childImageFile.name : "",
      verificationCode: document.getElementById("verificationCode").value
    };

    const message = document.getElementById("childVerificationMessage");

    console.log("Child verification submitted:", data);

    if (validateChildVerification(data)) {
      saveToLocalStorage("childVerificationData", data);
      message.textContent = "Child verification details saved successfully.";
      message.style.color = "green";
      childVerificationForm.reset();
      updatePreview();
    } else {
      console.error("Child verification failed validation.");
      message.textContent = "Please complete all child verification fields correctly.";
      message.style.color = "red";
    }
  });

  rideForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      pickupLocation: document.getElementById("pickupLocation").value,
      homeAddress: document.getElementById("homeAddress").value,
      pickupDate: document.getElementById("pickupDate").value,
      pickupTime: document.getElementById("pickupTime").value
    };

    const message = document.getElementById("rideMessage");

    if (validateRide(data)) {
      saveToLocalStorage("rideData", data);
      message.textContent = "Ride scheduled successfully.";
      rideForm.reset();
      updatePreview();
    } else {
      message.textContent = "Please fill in all ride fields correctly.";
      message.style.color = "red";
    }
  });

  updatePreview();
}

if (typeof module !== "undefined") {
  module.exports = {
    validateRegistration,
    validateRide,
    validateDriverRegistration,
    validateChildVerification
  };
}
