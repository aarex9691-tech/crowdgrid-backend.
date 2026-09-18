const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
    attendeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    status: {
        type: String,
        enum: ['Valid', 'Scanned', 'Revoked'],
        default: 'Valid'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pass', passSchema);