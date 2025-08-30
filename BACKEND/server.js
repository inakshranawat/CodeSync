const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const Room = require('./models/Room'); // Import Room model

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // For testing, allow all. Later restrict to frontend URL.
        methods: ['GET', 'POST']
    }
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join Room
    socket.on('joinRoom', async ({ roomId, username }) => {
        socket.join(roomId);
        console.log(`${username} joined room: ${roomId}`);

        // Load or create room
        let room = await Room.findOne({ roomId });
        if (!room) {
            room = new Room({ roomId });
            await room.save();
        }

        // Add user to room's users list if not already
        if (!room.users.includes(username)) {
            room.users.push(username);
            await room.save();
        }

        // Send current code to the user who joined
        socket.emit('loadCode', room.code);

        // Broadcast updated users list to everyone in room
        io.to(roomId).emit('updateUsers', room.users);
    });

    // Listen for code changes
    socket.on('codeChange', async ({ roomId, code }) => {
        // Update code in DB
        await Room.findOneAndUpdate({ roomId }, { code });
        // Broadcast code to all others in the room
        socket.to(roomId).emit('receiveCode', code);
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.id);
        // Optional: remove user from rooms if we track users per socket
    });
});

// API Routes
const roomRoutes = require('./routes/roomRoutes');
app.use('/api/rooms', roomRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.log('MongoDB connection error:', err));
