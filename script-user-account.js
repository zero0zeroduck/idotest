// Redirect to login if not logged in
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'signin.html';
}

// Initialize user data from sessionStorage or defaults
let username = sessionStorage.getItem('username') || 'User';
let votes = parseInt(sessionStorage.getItem('votes')) || 0;
let moneyEarned = parseInt(sessionStorage.getItem('moneyEarned')) || 0;

const maxMoney = 1000000;

const usernameDisplay = document.getElementById('username-display');
const votesCount = document.getElementById('votes-count');
const moneyDisplay = document.getElementById('money-earned');
const tapBtn = document.getElementById('tap-btn');
const cashoutBtn = document.getElementById('cashout-btn');

// Display user info
usernameDisplay.textContent = username;
votesCount.textContent = votes;
moneyDisplay.textContent = moneyEarned.toLocaleString();

// Show/hide cashout button based on money
function updateCashoutButton() {
  if (moneyEarned >= maxMoney) {
    cashoutBtn.classList.remove('hidden');
  } else {
    cashoutBtn.classList.add('hidden');
  }
}

// Tap game logic
tapBtn.addEventListener('click', () => {
  if (moneyEarned < maxMoney) {
    moneyEarned++;
    moneyDisplay.textContent = moneyEarned.toLocaleString();
    sessionStorage.setItem('moneyEarned', moneyEarned);
    updateCashoutButton();
  }
});

// Cash out button redirects to step 1 of payment flow
cashoutBtn.addEventListener('click', () => {
  window.location.href = 'payment-step1.html';
});

// On load update cashout button
updateCashoutButton();
