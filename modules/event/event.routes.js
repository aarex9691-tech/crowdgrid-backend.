const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('./event.controller');

// --- THE 20% MANUAL CHALLENGE: MOCK MIDDLEWARE ---
const mockRequireAuth = (req, res, next) => {
    // We look for a custom header in Postman instead of a real JWT token
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: Missing x-user-id header' });
    }

    // Attach fake user data to the request, simulating what a real JWT would do
    req.user = {
        _id: userId,
        role: 'Organizer',
        organizationName: 'TechCorp'
    };

    next(); // Passes the flow to createEvent
};
// --------------------------------------------------

// The Routes
router.post('/', mockRequireAuth, createEvent);
router.get('/', getEvents); // Leaving GET public for now

module.exports = router;