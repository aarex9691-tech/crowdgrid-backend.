const express = require('express');
const router = express.Router();
const { generatePass, getMyPasses } = require('./pass.controller');
const { requireAuth } = require('../auth/auth.middleware');

router.post('/', requireAuth, generatePass);
router.get('/my-passes', requireAuth, getMyPasses);

module.exports = router;