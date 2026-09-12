const express = require('express');
const { createEventHandler } = require('./event.controller');
const authGuard = require('../../middleware/authGuard');
const roleGuard = require('../../middleware/roleGuard');

const router = express.Router();

router.post('/', authGuard, roleGuard(['HOST', 'ADMIN']), createEventHandler);

module.exports = router;
