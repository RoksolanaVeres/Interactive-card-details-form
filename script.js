// DOM elements
// containers
const formContainer = document.querySelector(".form-container");
const completedFormContainer = document.querySelector(
  ".completed-form__container"
);
// form
const form = document.querySelector(".form");
// inputs
const cardholderNameInput = document.getElementById("cardholder-name");
const cardNumberInput = document.getElementById("card-number");
const expMonthInput = document.querySelector(".exp-month");
const expYearInput = document.querySelector(".exp-year");
const cvcInput = document.getElementById("cvc");
// card elements
const cardCvcContainer = document.querySelector(".back-card__CVC");
const cardNumberContainer = document.querySelector(
  ".front-card__number-container"
);
const cardNameContainer = document.querySelector(".front-card__name");
const cardExpMonthContainer = document.querySelector(".exp-month-container");
const cardExpYearContainer = document.querySelector(".exp-year-container");
// errors
const cardholderNameError = document.querySelector(".cardholder-name-error");
const numberError = document.querySelector(".number-error");
const expDateError = document.querySelector(".exp-date-error");
const cvcError = document.querySelector(".cvc-error");
// buttons
const continueButton = document.querySelector(".continue-button");
// overlay with spinner
const overlaySpinnerContainer = document.querySelector(
  ".overlay-spinner-container"
);

// functions
function init() {
  overlaySpinnerContainer.style.display = "none";
  formContainer.style.display = "grid";
  completedFormContainer.style.display = "none";
  cardCvcContainer.textContent = "000";
  cardNumberContainer.textContent = "0000 0000 0000 0000";
  cardNameContainer.textContent = "Jane Appleseed";
  cardExpMonthContainer.textContent = "00";
  cardExpYearContainer.textContent = "00";
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
}

function showError(error, text, input) {
  error.style.display = "block";
  error.textContent = text;
  input.classList.add("input-error");
}

function hideError(error, input) {
  error.style.display = "none";
  input.classList.remove("input-error");
}

function addZeroToOneDigit(input, displayContainer) {
  if (input.value.length === 1) {
    input.value = "0" + input.value;
  }
  displayContainer.textContent = input.value;
}

function validateUsername() {
  let userName = cardholderNameInput.value;
  cardNameContainer.textContent = userName;
  if (userName === "") {
    showError(cardholderNameError, "Can't be blank", cardholderNameInput);
    return false;
  } else if (/[0-9]/.test(userName)) {
    showError(
      cardholderNameError,
      "Can't contain numbers",
      cardholderNameInput
    );
    return false;
  } else {
    hideError(cardholderNameError, cardholderNameInput);
  }
  return true;
}

function validateCardNumber() {
  cardNumberInput.value = cardNumberInput.value.slice(0, 19);
  cardNumberContainer.textContent = cardNumberInput.value;
  if (cardNumberInput.value === "") {
    showError(numberError, "Can't be blank", cardNumberInput);
    return false;
  } else if (/[a-zA-Z]/.test(cardNumberInput.value)) {
    showError(numberError, "Can't contain letters", cardNumberInput);
    return false;
  } else {
    hideError(numberError, cardNumberInput);
  }
  return true;
}

function validateNumberFormat() {
  if (!/^(\d{4}\s{1}){3}\d{4}$/.test(cardNumberInput.value)) {
    showError(numberError, "Wrong format!", cardNumberInput);
    return false;
  }
  return true;
}

function validateMonth() {
  expMonthInput.value = expMonthInput.value.slice(0, 2);
  cardExpMonthContainer.textContent = expMonthInput.value;
  if (expMonthInput.value > 12 || expMonthInput.value === "0") {
    showError(expDateError, "Enter a valid month", expMonthInput);
    return false;
  } else if (expMonthInput.value === "") {
    showError(expDateError, "Can't be blank", expMonthInput);
    return false;
  } else {
    hideError(expDateError, expMonthInput);
  }
  return true;
}

function validateYear() {
  expYearInput.value = expYearInput.value.slice(0, 2);
  cardExpYearContainer.textContent = expYearInput.value;
  if (expYearInput.value === "") {
    showError(expDateError, "Can't be blank", expYearInput);
    return false;
  } else {
    hideError(expDateError, expYearInput);
  }
  return true;
}

function validateCvc() {
  cvcInput.value = cvcInput.value.slice(0, 3);
  cardCvcContainer.textContent = cvcInput.value;
  if (cvcInput.value === "") {
    showError(cvcError, "Can't be blank", cvcInput);
    return false;
  } else if (cvcInput.value.length < 3) {
    showError(cvcError, "Enter a valid CVC", cvcInput);
    return false;
  } else {
    hideError(cvcError, cvcInput);
  }
  return true;
}

function validateForm() {
  return (
    validateUsername() &&
    validateCardNumber() &&
    validateNumberFormat() &&
    validateMonth() &&
    validateYear() &&
    validateCvc()
  );
}

function showSuccessMessage() {
  if (validateForm()) {
    overlaySpinnerContainer.style.display = "grid";
    setTimeout(() => {
      formContainer.style.display = "none";
      completedFormContainer.style.display = "grid";
    }, 1000);
  }
}

// eventListeners
cardholderNameInput.addEventListener("input", validateUsername);

cardNumberInput.addEventListener("input", validateCardNumber);
cardNumberInput.addEventListener("focusout", validateNumberFormat);

expMonthInput.addEventListener("input", validateMonth);
expMonthInput.addEventListener("focusout", () => {
  addZeroToOneDigit(expMonthInput, cardExpMonthContainer);
});

expYearInput.addEventListener("input", validateYear);
expYearInput.addEventListener("focusout", () => {
  addZeroToOneDigit(expYearInput, cardExpYearContainer);
});

cvcInput.addEventListener("input", validateCvc);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showSuccessMessage();
});

continueButton.addEventListener("click", init);

// init
init();

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll("[maxlength]").forEach((input) => {
//     input.addEventListener("input", (e) => {
//       let val = e.target.value,
//         len = +e.target.getAttribute("maxlength");
//       e.target.value = val.slice(0, len);
//     });
//   });
// });
