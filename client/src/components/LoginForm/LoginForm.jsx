import { useState } from 'react';
import { socket } from '../../socket';
import './LoginForm.scss';

export function LoginForm() {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('client:userConnected', username);
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <form
      className="LoginForm"
      onSubmit={handleSubmit}
    >
      <label
        className="LoginForm--title"
        htmlFor="username"
      >
        Write your username:
      </label>
      <input
        className="LoginForm--input"
        id="username"
        name="username"
        placeholder="Type here..."
        required
        type="text"
        value={username}
        onChange={handleChange}
      />

      <input
        className="LoginForm--button"
        type="submit"
        value="Start"
      />
    </form>
  );
}
