// Redirect to login if not logged in
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'signin.html';
}

const receiptUpload = document.getElementById('receipt-upload');
const previewContainer = document.getElementById('preview-container');
const receiptPreview = document.getElementById('receipt-preview');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const form = document.getElementById('receipt-form');

receiptUpload.addEventListener('change', () => {
  const file = receiptUpload.files[0];
  if (file) {
    // Show preview
    const reader = new FileReader();
    reader.onload = function (e) {
      receiptPreview.src = e.target.result;
      previewContainer.classList.remove('hidden');
    };
    reader.readAsDataURL(file);

    // Enable next button
    nextBtn.disabled = false;
  } else {
    previewContainer.classList.add('hidden');
    receiptPreview.src = '';
    nextBtn.disabled = true;
  }
});

backBtn.addEventListener('click', () => {
  window.location.href = 'user-account.html';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = receiptUpload.files[0];

  if (!file) {
    alert('Please upload a receipt image to continue.');
    return;
  }

  // Store the receipt image data URL in sessionStorage for next steps
  const reader = new FileReader();
  reader.onload = function (e) {
    sessionStorage.setItem('receiptImage', e.target.result);

    // Move to next step
    window.location.href = 'payment-step2.html';
  };
  reader.readAsDataURL(file);
});
