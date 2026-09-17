const Pass = require('./pass.model');
const { Event } = require('../event/event.model'); // Destructured Event

const generatePass = async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user._id;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const existingPass = await Pass.findOne({ eventId, userId });
        if (existingPass) return res.status(400).json({ message: 'You already have a pass for this event' });

        const newPass = await Pass.create({ eventId, userId });
        res.status(201).json(newPass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyPasses = async (req, res) => {
    try {
        const passes = await Pass.find({ userId: req.user._id }).populate('eventId', 'title eventType');
        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { generatePass, getMyPasses };