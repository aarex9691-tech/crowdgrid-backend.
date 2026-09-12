const { joinEventAsVolunteer, getByEventId } = require('./volunteer.service');

const joinEventHandler = async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user._id;

        if (!eventId) {
            return res.status(400).json({ message: 'Please provide an eventId' });
        }

        const volunteer = await joinEventAsVolunteer({ eventId, userId });
        res.status(201).json(volunteer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getByEventIdHandler = async (req, res) => {
    try {
        const volunteers = await getByEventId(req.params.eventId);
        res.status(200).json(volunteers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { joinEventHandler, getByEventIdHandler };
