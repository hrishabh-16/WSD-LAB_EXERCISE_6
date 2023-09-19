const form = document.getElementById('registration-form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const dobInput = document.getElementById('dob');
const submitButton = document.getElementById('submit-button');

// Real-time validation for each input field
fullNameInput.addEventListener('input', () => validateField(fullNameInput, /^[A-Za-z\s]{3,}$/));
emailInput.addEventListener('input', () => validateField(emailInput, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
passwordInput.addEventListener('input', () => validateField(passwordInput, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/));
confirmPasswordInput.addEventListener('input', () => validatePasswordMatch());
dobInput.addEventListener('input', () => calculateAge());

// Form validation on submission
form.addEventListener('submit', (event) => {
  if (!isFormValid()) {
    event.preventDefault();
  }
});

function validateField(inputElement, regex) {
  const statusElement = document.querySelector(`[data-for="${inputElement.id}"]`);
  if (regex.test(inputElement.value)) {
    statusElement.textContent = '✅';
    inputElement.classList.remove('invalid');
  } else {
    statusElement.textContent = '❌';
    inputElement.classList.add('invalid');
  }
}

function validatePasswordMatch() {
  const confirmPasswordStatus = document.querySelector('[data-for="confirm-password"]');
  if (confirmPasswordInput.value === passwordInput.value) {
    confirmPasswordStatus.textContent = '✅';
  } else {
    confirmPasswordStatus.textContent = '❌';
  }
}

function calculateAge() {
  const dob = new Date(dobInput.value);
  const age = new Date().getFullYear() - dob.getFullYear();
  const dobStatus = document.querySelector('[data-for="dob"]');
  
  if (age >= 18) {
    dobStatus.textContent = '✅';
    submitButton.removeAttribute('disabled');
  } else {
    dobStatus.textContent = '❌';
    submitButton.setAttribute('disabled', true);
  }
}

function isFormValid() {
  return (
    /^[A-Za-z\s]{3,}$/.test(fullNameInput.value) &&
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value) &&
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInput.value) &&
    confirmPasswordInput.value === passwordInput.value &&
    calculateAge() >= 18
  );
}
