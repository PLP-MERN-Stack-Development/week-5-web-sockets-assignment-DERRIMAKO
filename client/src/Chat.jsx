import React, { useEffect, useState } from 'react';
import { useSocket } from './socket/socket';
import socket from './socket/socket';

const Chat = ({ username }) => {
  const {
    isConnected,
    connect,
    sendMessage,
    sendPrivateMessage,
    messages,
    users,
    typingUsers,
    setTyping,
    socket: clientSocket,
  } = useSocket();

  const [input, setInput] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    connect(username);
  }, [username]);

  const handleSend = () => {
    if (!input.trim()) return;

    if (selectedUserId) {
      sendPrivateMessage(selectedUserId, input.trim());
    } else {
      sendMessage(input.trim());
    }

    setInput('');
    setTyping(false);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setTyping(true);
  };

  const handleBlur = () => {
    setTyping(false);
  };

  const typingOthers = typingUsers.filter((name) => name !== username);

  const handleReact = (messageId, reaction) => {
    setReactions((prev) => ({
      ...prev,
      [messageId]: reaction,
    }));
    // Optional: emit reaction event here if you want server-side logic
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {username}!</h2>
      <p>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>

      {/* User selector */}
      <div>
        <label>Send privately to: </label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Everyone</option>
          {users
            .filter((u) => u.id !== socket.id)
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
        </select>
      </div>

      {/* Message input */}
      <input
        type="text"
        value={input}
        placeholder="Type a message"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button onClick={handleSend}>Send</button>

      {/* Typing Indicator */}
      <div style={{ marginTop: '1rem' }}>
        {typingOthers.length > 0 && (
          <p>
            {typingOthers.join(', ')} {typingOthers.length === 1 ? 'is' : 'are'} typing...
          </p>
        )}
      </div>

      {/* Online Users */}
      <div>
        <h4>Online Users: {users.map((u) => u.username).join(', ')}</h4>
      </div>

      {/* Message list */}
      <ul>
        {messages.map((msg) => (
          <li key={msg.id} style={{ marginBottom: '1rem' }}>
            <strong>{msg.sender}</strong>
            {msg.isPrivate ? ' (private)' : ''}: {msg.message}{' '}
            <em>({msg.timestamp})</em>
            <div>
              <button onClick={() => handleReact(msg.id, '👍')}>👍</button>
              <button onClick={() => handleReact(msg.id, '❤️')}>❤️</button>
              {reactions[msg.id] && (
                <span> You reacted: {reactions[msg.id]}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
