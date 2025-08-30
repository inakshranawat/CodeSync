const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Get room by ID
router.get('/:roomId', async (req, res) => {
    try {
        const { roomId } = req.params;
        let room = await Room.findOne({ roomId });

        if (!room) {
            room = new Room({ roomId });
            await room.save();
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
