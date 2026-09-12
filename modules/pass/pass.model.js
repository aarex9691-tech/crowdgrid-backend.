const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passType: {
        type: String,
        default: 'general' // e.g., general, VIP
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pass', passSchema);
