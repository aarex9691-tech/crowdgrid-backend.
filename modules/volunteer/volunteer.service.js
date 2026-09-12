const Volunteer = require('./volunteer.model');

const joinEventAsVolunteer = async (volunteerData) => {
    const volunteer = await Volunteer.create(volunteerData);
    return volunteer;
};
const getByEventId = async (eventId) => {
    return await Volunteer.find({ eventId });
};

module.exports = { joinEventAsVolunteer, getByEventId };
