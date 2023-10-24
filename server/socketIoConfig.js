import { createRandomId } from './helpers.js';

export function socketIoConfig(socket) {
  socket.emit('server:initializeRoom', {
    id: createRandomId(),
  });

  socket.on('client:joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('client:joinAnotherRoom', ({ prevRoomId, roomId, user }) => {
    const room = socket.adapter.rooms.get(roomId);
    if (!room) return socket.emit('server:error:roomNotFound');

    const usersInRoom = room.size;
    if (usersInRoom === 2) return socket.emit('server:error:roomFull');

    socket.leave(prevRoomId);
    socket.emit('server:initializeRoom', {
      id: roomId,
    });
    socket.to(roomId).emit('server:newRival', { ...user, mark: 'circle' });
  });

  socket.on('client:userConnected', (username) => {
    const userData = {
      id: socket.id,
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

  socket.on('client:rivalJoinedRoom', (host, rival) => {
    socket
      .to(rival.id)
      .emit('server:updateHostData', { ...host }, { ...rival });
  });

  socket.on('client:cellSelected', (roomId, index, turn) => {
    socket.to(roomId).emit('server:cellSelected', index, turn);
  });
}
