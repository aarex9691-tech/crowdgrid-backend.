const express = require('express');
const { createPassHandler, getByEventIdHandler } = require('./pass.controller');
const authGuard = require('../../middleware/authGuard');

const router = express.Router();

router.get('/event/:eventId', getByEventIdHandler);
router.post('/create', authGuard, createPassHandler);

module.exports = router;
