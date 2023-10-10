const socket = io(); // Conecta al servidor de sockets

// Obtén referencias a los elementos del formulario de chat en tu HTML
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// Evento para manejar el envío de mensajes
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = chatInput.value;

  // Envía el mensaje al servidor de sockets
  socket.emit('chat message', message);

  // Limpia el campo de entrada
  chatInput.value = '';
});

// Evento para recibir mensajes del servidor
socket.on('chat message', message => {
  const messageElement = document.createElement('li');
  messageElement.innerText = `${message.username}: ${message.message}`;
  chatMessages.appendChild(messageElement);
});
