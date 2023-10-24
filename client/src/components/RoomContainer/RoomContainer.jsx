import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { socket } from '../../socket';
import { ACTIONS, ERRORS } from '../../utils/constants';
import './RoomContainer.scss';

export function RoomContainer() {
  const { state, dispatch } = useAppContext();
  const { error, room, user } = state;
  const [roomId, setRoomId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('client:joinAnotherRoom', {
      prevRoomId: room.id,
      roomId,
      user
    });
  };

  useEffect(() => {
    if (error.type === '') setRoomId('');
  }, [error.type]);

  useEffect(() => {
    setRoomId('');
  }, [room]);

  const handleChange = (event) => {
    setRoomId(event.target.value);

    if (error.type !== '') dispatch({ type: ACTIONS.CLEAN_ERROR });
  };

  return (
    <div className="RoomContainer">
      <p className="RoomContainer--info">
        <span className="RoomContainer--room-text">Room ID:</span>
        <span className="RoomContainer--room-id">{room.id}</span>
      </p>

      <div>
        <form
          className="RoomContainer--form"
          onSubmit={handleSubmit}
        >
          <input
            className="RoomContainer--input"
            maxLength={6}
            minLength={6}
            name="roomId"
            placeholder="Type a room ID..."
            required
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

        {error.type === ERRORS.ROOM_FULL ? (
          <span className="RoomContainer--room-error-message">
            Full room. 😥 Try with a different room.
          </span>
        ) : null}
        {error.type === ERRORS.ROOM_NOT_FOUND ? (
          <span className="RoomContainer--room-error-message">
            Room not found. 😥 Try with a different ID.
          </span>
        ) : null}
      </div>
    </div>
  );
}