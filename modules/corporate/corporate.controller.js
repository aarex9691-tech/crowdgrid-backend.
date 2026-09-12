const { joinEventAsCorporate, getByEventId } = require('./corporate.service');

const joinEventHandler = async (req, res) => {
    try {
        const { eventId, contributionAmount } = req.body;
        const userId = req.user._id;

        if (!eventId) {
            return res.status(400).json({ message: 'Please provide an eventId' });
        }

        const corporate = await joinEventAsCorporate({ eventId, userId, contributionAmount });
        res.status(201).json(corporate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getByEventIdHandler = async (req, res) => {
    try {
        const corporates = await getByEventId(req.params.eventId);
        res.status(200).json(corporates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { joinEventHandler, getByEventIdHandler };
