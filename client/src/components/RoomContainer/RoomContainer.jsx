import { useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { socket } from '../../socket';
import './RoomContainer.scss';

export function RoomContainer() {
  const { state } = useAppContext();
  const [roomId, setRoomId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('client:joinAnotherRoom', {
      prevRoomId: state.room.id,
      roomId,
    });
    setRoomId('');
  };

  const handleChange = (event) => {
    setRoomId(event.target.value);
  };

  return (
    <div className="RoomContainer">
      <p className="RoomContainer--info">
        <span className="RoomContainer--room-text">Room ID:</span>
        <span className="RoomContainer--room-id">{state.room.id}</span>
      </p>

      <form
        className="RoomContainer--form"
        onSubmit={handleSubmit}
      >
        <input
          className="RoomContainer--input"
          name="roomId"
          placeholder="Type a room ID..."
          type="text"
          value={roomId}
          onChange={handleChange}
        />
        <input
          className="RoomContainer--submit"
          type="submit"
          value="Join Room"
        />
      </form>
    </div>
  );
}
