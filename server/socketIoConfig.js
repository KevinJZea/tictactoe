import crypto from 'crypto';

export function socketIoConfig(socket) {
  socket.on('client:userConnected', (username) => {
    const userData = {
      id: socket.id.slice(0, 5),
      username,
    };
    socket.emit('server:initializeUser', userData);
  });

  socket.on('client:newMessage', (messageData) => {
    const newMessage = {
      ...messageData,
      id: crypto.randomUUID(),
    };
    socket.broadcast.emit('server:newMessage', newMessage);
    socket.emit('server:newMessage', newMessage);
  });
}
