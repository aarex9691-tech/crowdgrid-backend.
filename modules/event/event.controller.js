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
        // 1. Pagination Parameters from URL
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        // 2. Dynamic Access Control: Everyone sees Public events
        const query = { $or: [{ eventType: 'Public' }] };

        // If user is authenticated, they also see their own events and corporate events
        if (req.user) {
            query.$or.push({ organizerId: req.user._id });
            if (req.user.organizationName) {
                query.$or.push({ companyName: req.user.organizationName });
            }
        }

        // 3. Fetch events and total count concurrently
        const events = await Event.find(query).skip(skip).limit(limit);
        const totalEvents = await Event.countDocuments(query);

        // 4. Return structured response with metadata
        res.status(200).json({
            events,
            pagination: {
                totalEvents,
                totalPages: Math.ceil(totalEvents / limit),
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEvent, getEvents };