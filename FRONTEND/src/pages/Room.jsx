import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import CodeEditor from '../components/Editor';

let socket;

export default function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // for redirect
  const { username } = location.state;

  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket = io('https://codesync-backend-qplu.onrender.com');
    socket.emit('joinRoom', { roomId, username });

    socket.on('loadCode', (roomCode) => setCode(roomCode));
    socket.on('receiveCode', (newCode) => setCode(newCode));
    socket.on('updateUsers', (usersList) => setUsers(usersList));

    return () => {
      socket.disconnect();
    };
  }, [roomId, username]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit('codeChange', { roomId, code: newCode });
  };

  // New: Handle Leave Room
  const handleLeaveRoom = () => {
    // Optionally notify backend to remove user from room
    socket.disconnect();
    navigate('/'); // Redirect to Home
  };

  return (
    <div className="flex h-screen">
      {/* Code Editor */}
      <div className="w-3/4 border-r border-gray-300 relative">
        <CodeEditor code={code} onChange={handleCodeChange} />
        {/* Leave Room Button */}
        <button
          onClick={handleLeaveRoom}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Leave Room
        </button>
      </div>

      {/* Users Panel */}
      <div className="w-1/4 bg-gray-100 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Users in Room</h2>
        <ul className="flex flex-col gap-2">
          {users.map((user) => (
            <li
              key={user}
              className={`p-2 rounded-lg ${
                user === username ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-300 text-gray-800'
              }`}
            >
              {user}
            </li>
          ))}
        </ul>
        <div className="mt-auto text-gray-500 text-sm">
          Room ID: <span className="font-mono">{roomId}</span>
        </div>
      </div>
    </div>
  );
}
