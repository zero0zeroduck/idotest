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
