import React, { useState } from 'react';
import Login from './Login';
import Chat from './Chat';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div>
      <h1>⚡ Derricko Real-Time Chat App</h1>
      {username ? (
        <Chat username={username} />
      ) : (
        <Login onLogin={setUsername} />
      )}
    </div>
  );
}

export default App;
