const { createPass, getByEventId } = require('./pass.service');

const createPassHandler = async (req, res) => {
    try {
        const { eventId, passType } = req.body;
        const userId = req.user._id;

        if (!eventId) {
            return res.status(400).json({ message: 'Please provide an eventId' });
        }

        const pass = await createPass({ eventId, userId, passType });
        res.status(201).json(pass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getByEventIdHandler = async (req, res) => {
    try {
        const passes = await getByEventId(req.params.eventId);
        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPassHandler, getByEventIdHandler };
