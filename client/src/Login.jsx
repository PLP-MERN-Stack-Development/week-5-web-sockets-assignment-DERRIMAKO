import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div>
      <h2>Enter your username to join the chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
};

export default Login;
