import { useState } from 'react';
import './LoginForm.scss';

export function LoginForm({ setUserData }) {
  const [textValue, setTextValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserData((prevData) => ({ ...prevData, username: textValue }));
  };

  const handleChange = (event) => {
    setTextValue(event.target.value);
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
        value={textValue}
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
