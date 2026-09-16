const { Event, PublicEvent, CorporateEvent, PilgrimEvent } = require('./event.model');

const createEvent = async (req, res) => {
    try {
        const { eventType, ...eventData } = req.body;

        // Attach the mock user ID to the event
        eventData.organizerId = req.user._id;

        let newEvent;

        // Dynamically create the correct polymorphic event
        if (eventType === 'Public') {
            newEvent = await PublicEvent.create(eventData);
        } else if (eventType === 'Corporate') {
            eventData.companyName = req.user.organizationName;
            newEvent = await CorporateEvent.create(eventData);
        } else if (eventType === 'Pilgrim') {
            newEvent = await PilgrimEvent.create(eventData);
        } else {
            return res.status(400).json({ message: 'Invalid eventType' });
        }

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        // Dynamic Access Control: Everyone sees Public events
        const query = { $or: [{ eventType: 'Public' }] };

        // If user is authenticated, they also see their own events and corporate events
        if (req.user) {
            query.$or.push({ organizerId: req.user._id });
            if (req.user.organizationName) {
                query.$or.push({ companyName: req.user.organizationName });
            }
        }

        const events = await Event.find(query);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEvent, getEvents };