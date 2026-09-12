const { createEvent } = require('./event.service');

const createEventHandler = async (req, res) => {
    try {
        const { title, description, targetFunds, status } = req.body;
        
        // Host ID is securely derived from the authenticated user token via authGuard
        const hostId = req.user._id;

        if (!title || !description || !targetFunds) {
            return res.status(400).json({ message: 'Please provide title, description, and targetFunds' });
        }

        const newEvent = await createEvent({
            title,
            description,
            hostId,
            targetFunds,
            status
        });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEventHandler };
