// Redirect to login if not logged in
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'signin.html';
}

// Redirect to Step 1 if no receipt uploaded
if (!sessionStorage.getItem('receiptImage')) {
  window.location.href = 'payment-step1.html';
}

const donationForm = document.getElementById('donation-form');
const donationRadios = donationForm.elements['donation'];
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const summary = document.getElementById('summary');
const summaryText = document.getElementById('summary-text');

// Map donation to reward for easy reference
const rewardsMap = {
  "1000": 23000,
  "2500": 60000,
  "5000": 130000,
  "10000": 1000000,
};

function updateSummary() {
  let selectedDonation = null;
  for (const radio of donationRadios) {
    if (radio.checked) {
      selectedDonation = radio.value;
      break;
    }
  }

  if (selectedDonation) {
    nextBtn.disabled = false;
    summary.classList.remove('hidden');
    summaryText.textContent = `You will donate $${Number(selectedDonation).toLocaleString()} and claim a reward of $${rewardsMap[selectedDonation].toLocaleString()}.`;
  } else {
    nextBtn.disabled = true;
    summary.classList.add('hidden');
    summaryText.textContent = '';
  }
}

// Listen for donation radio changes
for (const radio of donationRadios) {
  radio.addEventListener('change', updateSummary);
}

backBtn.addEventListener('click', () => {
  window.location.href = 'payment-step1.html';
});

donationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let selectedDonation = null;
  for (const radio of donationRadios) {
    if (radio.checked) {
      selectedDonation = radio.value;
      break;
    }
  }

  if (!selectedDonation) {
    alert('Please select a donation amount to proceed.');
    return;
  }

  // Save selected donation amount in sessionStorage for next steps
  sessionStorage.setItem('donationAmount', selectedDonation);

  // Move to step 3
  window.location.href = 'payment-step3.html';
});

// On page load, check if donation amount was previously selected and restore
window.addEventListener('load', () => {
  const savedDonation = sessionStorage.getItem('donationAmount');
  if (savedDonation) {
    for (const radio of donationRadios) {
      if (radio.value === savedDonation) {
        radio.checked = true;
        break;
      }
    }
    updateSummary();
  }
});
