const express = require('express');
const { createEventHandler, getAllEventsHandler, getEventByIdHandler } = require('./event.controller');
const authGuard = require('../../middleware/authGuard');
const roleGuard = require('../../middleware/roleGuard');

const router = express.Router();

router.get('/', getAllEventsHandler);
router.get('/:id', getEventByIdHandler);
router.post('/', authGuard, roleGuard(['HOST', 'ADMIN']), createEventHandler);

module.exports = router;
