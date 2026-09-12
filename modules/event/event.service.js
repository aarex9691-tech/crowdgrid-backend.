const Event = require('./event.model');

const createEvent = async (eventData) => {
    const event = await Event.create(eventData);
    return event;
};

module.exports = { createEvent };
