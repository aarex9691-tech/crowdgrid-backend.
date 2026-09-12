const Event = require('./event.model');

const createEvent = async (eventData) => {
    const event = await Event.create(eventData);
    return event;
};
const getAllEvents = async () => {
    return await Event.find({});
};

const getEventById = async (id) => {
    return await Event.findById(id);
};

module.exports = { createEvent, getAllEvents, getEventById };
