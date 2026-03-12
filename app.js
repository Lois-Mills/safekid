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

  if (!parentData && !rideData) {
    preview.innerHTML = "<p>No data saved yet.</p>";
  }
}

if (typeof document !== "undefined") {
  const registerForm = document.getElementById("registerForm");
  const rideForm = document.getElementById("rideForm");

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
    validateRide
  };
}