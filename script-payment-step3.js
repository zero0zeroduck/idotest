// Redirect to login if not logged in
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'signin.html';
}

// Redirect to Step 1 if no receipt uploaded
if (!sessionStorage.getItem('receiptImage')) {
  window.location.href = 'payment-step1.html';
}

// Redirect to Step 2 if no donation amount selected
if (!sessionStorage.getItem('donationAmount')) {
  window.location.href = 'payment-step2.html';
}

const form = document.getElementById('bank-details-form');
const backBtn = document.getElementById('back-btn');
const pendingPopup = document.getElementById('pending-popup');
const goHomeBtn = document.getElementById('go-home-btn');

backBtn.addEventListener('click', () => {
  window.location.href = 'payment-step2.html';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate inputs manually for better UX
  const fullName = form.fullName.value.trim();
  const accountNumber = form.accountNumber.value.trim();
  const bankName = form.bankName.value.trim();

  if (!fullName || !accountNumber || !bankName) {
    alert('Please fill in all fields.');
    return;
  }

  // Account number validation (6-20 digits)
  if (!/^\d{6,20}$/.test(accountNumber)) {
    alert('Account number should be between 6 and 20 digits.');
    return;
  }

  // Save details in sessionStorage (simulate)
  sessionStorage.setItem('fullName', fullName);
  sessionStorage.setItem('accountNumber', accountNumber);
  sessionStorage.setItem('bankName', bankName);

  // Show Pending Verification popup
  pendingPopup.classList.remove('hidden');
});

// On clicking Go to Home, redirect to home and clear payment session storage
goHomeBtn.addEventListener('click', () => {
  // Clear payment related data to avoid reuse
  sessionStorage.removeItem('receiptImage');
  sessionStorage.removeItem('donationAmount');
  sessionStorage.removeItem('fullName');
  sessionStorage.removeItem('accountNumber');
  sessionStorage.removeItem('bankName');

  window.location.href = 'index.html';
});
