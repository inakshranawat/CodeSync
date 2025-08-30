const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true },
    code: { type: String, default: '' },
    users: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);


