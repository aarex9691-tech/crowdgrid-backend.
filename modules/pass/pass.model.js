const mongoose = require('mongoose');

const passSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        status: {
            type: String,
            enum: ['Active', 'Used', 'Cancelled'],
            default: 'Active',
        },
        qrCode: {
            type: String, // We will store the QR image as a text string here
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Pass', passSchema);