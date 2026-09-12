const express = require('express');
const { joinEventHandler, getByEventIdHandler } = require('./volunteer.controller');
const authGuard = require('../../middleware/authGuard');

const router = express.Router();

router.get('/event/:eventId', getByEventIdHandler);
router.post('/join', authGuard, joinEventHandler);

module.exports = router;
