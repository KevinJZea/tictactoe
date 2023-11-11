import { createRandomId } from './helpers.js';

export function socketIoConfig(socket) {
  let currentRoomId = createRandomId();

  socket.emit('server:initializeRoom', {
    id: currentRoomId,
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
    currentRoomId = roomId;
    socket.emit('server:initializeRoom', {
      id: roomId,
    });
    socket.to(roomId).emit('server:newRival', { ...user, mark: 'circle' });
  });

  socket.on('client:userConnected', (username) => {
    socket.username = username;
    const userData = {
      id: socket.id,
      username,
    };
    socket.emit('server:initializeUser', userData);
  });

  socket.on('client:newMessage', (messageData) => {
    const newMessage = {
      content: messageData.content,
      id: createRandomId(),
      sender: { ...messageData.sender },
    };
    socket.to(messageData.room.id).emit('server:newMessage', newMessage);
    socket.emit('server:newMessage', newMessage);
  });

  socket.on('client:rivalJoinedRoom', (host, rival) => {
    const rivalMessage = {
      content: `${host.username} has joined the room`,
      id: createRandomId(),
      sender: { username: 'server', id: 'server' },
    };
    socket.to(rival.id).emit('server:newMessage', rivalMessage);

    const hostMessage = {
      content: `${rival.username} has joined the room`,
      id: createRandomId(),
      sender: { username: 'server', id: 'server' },
    };
    socket.emit('server:newMessage', hostMessage);

    socket
      .to(rival.id)
      .emit('server:updateHostData', { ...host }, { ...rival });
  });

  socket.on('client:cellSelected', (roomId, index, turn) => {
    socket.to(roomId).emit('server:cellSelected', index, turn);
  });

  socket.on('disconnect', () => {
    const newMessage = {
      content: `${socket.username} has left the room`,
      id: createRandomId(),
      sender: { username: 'server', id: 'server' },
    };
    socket.to(currentRoomId).emit('server:newMessage', newMessage);
    socket.to(currentRoomId).emit('server:rivalAbandoned');
  });
}
