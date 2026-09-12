const Corporate = require('./corporate.model');

const joinEventAsCorporate = async (corporateData) => {
    const corporate = await Corporate.create(corporateData);
    return corporate;
};
const getByEventId = async (eventId) => {
    return await Corporate.find({ eventId });
};

module.exports = { joinEventAsCorporate, getByEventId };
