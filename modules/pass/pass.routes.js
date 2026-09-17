const express = require('express');
const router = express.Router();
const { requireAuth } = require('../auth/auth.middleware'); // Destructure the function properly
const { generatePass, getMyPasses, scanPass } = require('./pass.controller');

router.post('/', requireAuth, generatePass);
router.get('/my-passes', requireAuth, getMyPasses);
router.post('/scan', requireAuth, scanPass);

module.exports = router;