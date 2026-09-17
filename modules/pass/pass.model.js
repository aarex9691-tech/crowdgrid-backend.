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
    status: {
        type: String,
        enum: ['Active', 'Used', 'Cancelled'],
        default: 'Active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Pass', passSchema);