import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomId || !username) return alert('Enter Room ID & Username');
    navigate(`/room/${roomId}`, { state: { username } });
  }

  const handleNewRoom = () => {
    const newId = uuidv4().slice(0, 8); // short unique ID
    setRoomId(newId);
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)'
        // zinc-900 (#18181b), zinc-800 (#27272a), zinc-700 (#3f3f46)
      }}
    >
      <div className="flex flex-1 items-center justify-center">
        <div
          className="rounded-2xl shadow-2xl p-10 w-96 flex flex-col items-center"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 100%)'
            // white to blue-500 (#3b82f6)
          }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <img
              src="/icon.png"
              alt="Code Sync Logo"
              className="w-10 h-10 object-contain"
            />
            Code Sync
          </h1>

          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />

          {/* Join Room Button */}
          <button
            onClick={handleJoin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-3"
          >
            Join Room
          </button>

          {/* New Room Button */}
          <button
            onClick={handleNewRoom}
            className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-100 transition"
          >
            New Room
          </button>
        </div>
      </div>
      <footer className="w-full text-center py-4 text-white font-medium opacity-80">
        Build by <span className="inline-block align-middle text-red-500 mx-1" role="img" aria-label="heart">❤️</span> Naksh Ranawat
      </footer>
    </div>
  );
}
