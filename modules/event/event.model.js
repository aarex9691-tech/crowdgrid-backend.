const mongoose = require('mongoose');

// Base Event Schema
const eventSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        date: Date,
        organizerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        discriminatorKey: 'eventType',
        collection: 'events',
        timestamps: true,
    }
);

const Event = mongoose.model('Event', eventSchema);

// PublicEvent Discriminator
const PublicEvent = Event.discriminator(
    'PublicEvent',
    new mongoose.Schema({
        ticketPrice: Number,
        maxCapacity: {
            type: Number,
            required: true,
        },
    })
);

// CorporateEvent Discriminator
const CorporateEvent = Event.discriminator(
    'CorporateEvent',
    new mongoose.Schema({
        companyName: {
            type: String,
            required: true,
        },
        isPrivate: {
            type: Boolean,
            default: true,
        },
    })
);

// PilgrimEvent Discriminator
const PilgrimEvent = Event.discriminator(
    'PilgrimEvent',
    new mongoose.Schema({
        inventory: {
            bedsAvailable: Number,
            mealsAvailable: Number,
        },
    })
);

module.exports = {
    Event,
    PublicEvent,
    CorporateEvent,
    PilgrimEvent,
};
