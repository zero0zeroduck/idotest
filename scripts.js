// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // --------- Hero Slider Automatic Loop ---------
  const slideTrack = document.querySelector('.slide-track');
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  const slideWidthPercent = 100; // Each slide is 100% width in animation

  // We are animating via CSS keyframes, so no JS needed here unless you want manual control.

  // --------- Video Carousel Logic ---------
  const carousel = document.querySelector('.carousel');
  const videos = Array.from(carousel.querySelectorAll('iframe'));
  let videoIndex = 0;

  function showVideo(index) {
    // Hide all videos
    videos.forEach((vid, i) => {
      vid.style.display = i === index ? 'block' : 'none';
    });
  }

  // Show first video initially
  showVideo(videoIndex);

  // Create navigation buttons
  const navContainer = document.createElement('div');
  navContainer.style.textAlign = 'center';
  navContainer.style.marginTop = '10px';

  videos.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.textContent = idx + 1;
    btn.style.margin = '0 5px';
    btn.style.padding = '6px 12px';
    btn.style.borderRadius = '8px';
    btn.style.border = 'none';
    btn.style.background = 'rgba(0,172,209,0.6)';
    btn.style.color = 'white';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = '600';
    btn.addEventListener('click', () => {
      videoIndex = idx;
      showVideo(videoIndex);
      updateButtons();
    });
    navContainer.appendChild(btn);
  });

  carousel.parentNode.appendChild(navContainer);

  function updateButtons() {
    const buttons = navContainer.querySelectorAll('button');
    buttons.forEach((btn, i) => {
      btn.style.background = i === videoIndex ? '#00ACD1' : 'rgba(0,172,209,0.6)';
    });
  }

  updateButtons();

  // --------- Popup Logos Random Positioning and Animation ---------
  const popupLogos = document.querySelectorAll('.popup-logo');

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function positionLogos() {
    const container = document.querySelector('.logo-showcase');
    const rect = container.getBoundingClientRect();

    popupLogos.forEach(logo => {
      // Calculate random positions within container boundaries,
      // leave some padding from edges (e.g., 20px)
      const maxX = rect.width - logo.offsetWidth - 20;
      const maxY = rect.height - logo.offsetHeight - 20;

      const randomX = randomBetween(20, maxX);
      const randomY = randomBetween(20, maxY);

      logo.style.left = `${randomX}px`;
      logo.style.top = `${randomY}px`;

      // Random animation delay for popup effect
      const delay = randomBetween(0, 3);
      logo.style.animationDelay = `${delay}s`;
    });
  }

  // Position logos initially
  positionLogos();

  // Reposition on window resize to keep them visible
  window.addEventListener('resize', () => {
    positionLogos();
  });
});
