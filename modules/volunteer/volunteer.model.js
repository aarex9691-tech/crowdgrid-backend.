const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
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
    status: {
        type: String,
        default: 'pending' // pending, approved, rejected
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
