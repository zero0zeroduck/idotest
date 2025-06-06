// Hero background images
const heroImages = [
  'media/images/hero1.jpg',
  'media/images/hero2.jpg',
  'media/images/hero3.jpg',
];

const heroSection = document.querySelector('.hero');
let bgIndex = 0;

// Initialize background image
heroSection.style.setProperty('--hero-bg', `url(${heroImages[bgIndex]})`);
heroSection.style.backgroundImage = `url(${heroImages[bgIndex]})`;

// Since we use ::before pseudo, we update it by toggling class and background
function changeBackground() {
  // Fade out
  heroSection.classList.add('fade-out');

  setTimeout(() => {
    bgIndex = (bgIndex + 1) % heroImages.length;
    heroSection.style.setProperty('--hero-bg', `url(${heroImages[bgIndex]})`);
    // Because ::before reads from CSS content, we manipulate directly here by toggling background-image on heroSection::before
    heroSection.style.backgroundImage = `url(${heroImages[bgIndex]})`;
    heroSection.classList.remove('fade-out');
  }, 1000); // match CSS transition duration
}

setInterval(changeBackground, 7000); // change every 7 seconds

// To make ::before pick up the background-image from inline style is tricky; 
// instead, we'll update the background of the .hero directly and use overlay div:

// So let's change approach: We'll add a dedicated overlay div inside hero and animate that.

// ---

// Revised approach:

// In HTML inside hero add this:

/*
<div class="hero-bg-overlay"></div>
*/

// CSS:

/*
.hero-bg-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.4);
  z-index: -1;
  opacity: 1;
  transition: opacity 1s ease-in-out;
}
.hero-bg-overlay.fade-out {
  opacity: 0;
}
*/

// JS updated:

const heroBgOverlay = document.createElement('div');
heroBgOverlay.classList.add('hero-bg-overlay');
heroSection.prepend(heroBgOverlay);

function changeBackgroundUpdated() {
  // Fade out current image
  heroBgOverlay.classList.add('fade-out');

  setTimeout(() => {
    bgIndex = (bgIndex + 1) % heroImages.length;
    heroBgOverlay.style.backgroundImage = `url(${heroImages[bgIndex]})`;
    heroBgOverlay.classList.remove('fade-out');
  }, 1000);
}

heroBgOverlay.style.backgroundImage = `url(${heroImages[bgIndex]})`;
setInterval(changeBackgroundUpdated, 7000);

// -----

// Text animation

const animatedText = document.getElementById('animated-text');

// Split the text by ' - ' to get fragments
const fullText = "Welcome to the Beast Game! Play - and win - from home";
const textFragments = fullText.split(' - ');

let textIndex = 0;

function showNextText() {
  animatedText.textContent = textFragments[textIndex];
  textIndex = (textIndex + 1) % textFragments.length;
}

// Start immediately and loop every 3 seconds
showNextText();
setInterval(showNextText, 3000);

const players = [
  { name: 'Zane', votes: 42, earnings: '$500,000', img: 'media/images/player1.jpg' },
  { name: 'Leila', votes: 87, earnings: '$250,000', img: 'media/images/player2.jpg' },
  { name: 'Kai', votes: 65, earnings: '$100,000', img: 'media/images/player3.jpg' },
];

const testimonials = [
  { name: 'Chris', text: 'Absolutely thrilling experience!', img: 'media/images/test1.jpg' },
  { name: 'Tasha', text: 'Can’t wait to play again!', img: 'media/images/test2.jpg' },
  { name: 'Rico', text: 'Best online game show ever!', img: 'media/images/test3.jpg' }
];

const playersContainer = document.getElementById('players-container');
const testimonialContainer = document.getElementById('testimonial-container');

function renderPlayers() {
  const sorted = [...players].sort((a, b) => b.votes - a.votes);
  playersContainer.innerHTML = '';
  sorted.forEach(player => {
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${player.img}" alt="${player.name}" style="width:100px;border-radius:50%;"><br>
      <strong>${player.name}</strong><br>
      Votes: ${player.votes}<br>
      Earnings: ${player.earnings}<br>
      <button onclick="vote('${player.name}')">Vote</button>
    `;
    playersContainer.appendChild(div);
  });
}

function vote(name) {
  const player = players.find(p => p.name === name);
  player.votes++;
  renderPlayers();
}

function renderTestimonials() {
  testimonials.forEach(test => {
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${test.img}" alt="${test.name}" style="width:50px;border-radius:50%;"><br>
      <strong>${test.name}</strong><br>
      <em>\"${test.text}\"</em>
    `;
    testimonialContainer.appendChild(div);
  });
}

renderPlayers();
renderTestimonials();
