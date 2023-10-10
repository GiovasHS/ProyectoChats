const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// Configura Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configura la conexión a MongoDB
mongoose.connect('mongodb+srv://eserna19:123456@cluster0.cjjatzy.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error en la conexión a MongoDB', err));

// Crea un modelo de datos para los mensajes del chat en MongoDB
const chatMessageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// Configura la comunicación de sockets
io.on('connection', socket => {
  console.log('Usuario conectado:', socket.id);

  // Maneja eventos de mensajes del chat
  socket.on('chat message', async message => {
    const chatMessage = new ChatMessage({ username: message.username, message: message.message });
    await chatMessage.save();

    // Emitir el mensaje a todos los clientes conectados
    io.emit('chat message', chatMessage);
  });

  // Maneja eventos cuando un usuario se desconecta
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor de sockets escuchando en el puerto ${PORT}`);
});
