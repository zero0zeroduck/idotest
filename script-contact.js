const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

// Function to create message elements
function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Simulated bot reply function
function botReply(userMsg) {
  // Basic keyword responses
  const lowerMsg = userMsg.toLowerCase();

  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return "Hello! How can we assist you today?";
  }
  if (lowerMsg.includes('hours') || lowerMsg.includes('time')) {
    return "Our support team is available 9 AM to 6 PM, Monday to Friday.";
  }
  if (lowerMsg.includes('prize') || lowerMsg.includes('win')) {
    return "You can win up to $1,000,000 by playing our games!";
  }
  if (lowerMsg.includes('sign in') || lowerMsg.includes('login')) {
    return "You can sign in from the 'Sign In' page using your credentials.";
  }
  if (lowerMsg.includes('thank')) {
    return "You're welcome! If you have more questions, just ask.";
  }
  return "Thanks for reaching out! We'll get back to you shortly.";
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  // Show user message
  addMessage(userMessage, 'user');
  messageInput.value = '';

  // Simulate delay for bot reply
  setTimeout(() => {
    const reply = botReply(userMessage);
    addMessage(reply, 'bot');
  }, 800);
});
