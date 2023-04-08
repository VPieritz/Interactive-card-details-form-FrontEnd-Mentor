const form = document.querySelector("form");
const inputs = {
  name: {
    element: document.getElementById("name_input"),
    cardElement: document.getElementById("name")
  },
  number: {
    element: document.getElementById("number_input"),
    cardElement: document.getElementById("number")
  },
  month: {
    element: document.getElementById("month_input"),
    cardElement: document.getElementById("month")
  },
  year: {
    element: document.getElementById("year_input"),
    cardElement: document.getElementById("year")
  },
  cvc: {
    element: document.getElementById("cvc_input"),
    cardElement: document.getElementById("cvc")
  }
};
const submitButton = document.getElementById("submit_button");
const formCompleted = document.querySelector(".submitted");

function setCardValue(element, cardElement) {
  cardElement.innerText = format(element.value);
}

function restrictToAlphabets(element) {
  element.value = element.value.replace(/[^a-zA-ZáéíóúâêîôûãõàèìòùäëïöüÁÉÍÓÚÂÊÎÔÛÃÕÀÈÌÒÙÄËÏÖÜ\s~´']/g, "").slice(0, 32);
}

function format(s) {
  return s.toString().replace(/\d{4}(?=.)/g, "$& ");
}

function showErrorMessage(input, message, fillError = false) {
  input.element.classList.add("error");
  if (fillError) {
    input.element.parentElement.classList.add("error_fill");
  }
  input.element.parentElement.classList.add("error_message");
}

function hideErrorMessage(input) {
  input.element.classList.remove("error");
  input.element.parentElement.classList.remove("error_fill");
  input.element.parentElement.classList.remove("error_message");
}

function checkInputValue(input, length) {
  if (!input.element.value) {
    showErrorMessage(input, "");
  } else if (input.element.value.length < length) {
    showErrorMessage(input, "", true);
  } else {
    hideErrorMessage(input);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  checkInputValue(inputs.name);
  checkInputValue(inputs.number, 16);
  checkInputValue(inputs.month, 2);
  checkInputValue(inputs.year, 2);
  checkInputValue(inputs.cvc, 3);

  if (
    inputs.name.element.value &&
    inputs.number.element.value &&
    inputs.month.element.value &&
    inputs.year.element.value &&
    inputs.cvc.element.value &&
    inputs.number.element.value.length == 16 &&
    inputs.month.element.value.length == 2 &&
    inputs.year.element.value.length == 2 &&
    inputs.cvc.element.value.length == 3
  ) {
    formCompleted.classList.remove("hidden");
    form.classList.add("hidden");
  }
}

Object.keys(inputs).forEach(key => {
  const input = inputs[key];
  input.element.addEventListener("keyup", () => setCardValue(input.element, input.cardElement));
  if (key === "name") {
    input.element.addEventListener("keyup", () => restrictToAlphabets(input.element));
  }
});

submitButton.addEventListener("click", handleSubmit);
