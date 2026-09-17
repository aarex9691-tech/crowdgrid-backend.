const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('./event.controller');
const { requireAuth } = require('../auth/auth.middleware');

// The Routes
router.post('/', requireAuth, createEvent); // Now using real JWT security!
router.get('/', getEvents);

module.exports = router;