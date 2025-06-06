const loginForm = document.getElementById('login-form');
const otpForm = document.getElementById('otp-form');
const errorMsg = document.getElementById('error-msg');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const otpInput = document.getElementById('otp-input');

const validUsername = 'Jack007';
const validPassword = 'bE1sT$G1me';
const staticOTP = '732258';

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMsg.textContent = '';

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (username === validUsername && password === validPassword) {
    // Hide login form, show OTP form
    loginForm.classList.add('hidden');
    otpForm.classList.remove('hidden');
    otpInput.focus();
  } else {
    errorMsg.textContent = 'Invalid username or password.';
  }
});

otpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMsg.textContent = '';

  const enteredOTP = otpInput.value.trim();

  if (enteredOTP === staticOTP) {
    // Save login state to session storage
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', validUsername);

    // Redirect to User Account page
    window.location.href = 'user-account.html';
  } else {
    errorMsg.textContent = 'Incorrect OTP. Please try again.';
  }
});

// If user already logged in, redirect to User Account page
window.addEventListener('load', () => {
  if (sessionStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'user-account.html';
  }
});
