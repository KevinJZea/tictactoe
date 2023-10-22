import { createRandomId } from './helpers.js';

export function socketIoConfig(socket) {
  socket.emit('server:initializeRoom', {
    id: createRandomId(),
  });

  socket.on('client:joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('client:joinAnotherRoom', ({ prevRoomId, roomId }) => {
    const usersInRoom = socket.adapter.rooms.get(roomId)?.size;
    if (usersInRoom === 2) return socket.emit('server:error:roomFull');

    socket.leave(prevRoomId);
    socket.emit('server:initializeRoom', {
      id: roomId,
    });
  });

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
      id: createRandomId(),
    };
    socket.broadcast.emit('server:newMessage', newMessage);
    socket.emit('server:newMessage', newMessage);
  });
}
