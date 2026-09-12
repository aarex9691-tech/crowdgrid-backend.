const Pass = require('./pass.model');

const createPass = async (passData) => {
    const pass = await Pass.create(passData);
    return pass;
};
const getByEventId = async (eventId) => {
    return await Pass.find({ eventId });
};

module.exports = { createPass, getByEventId };
