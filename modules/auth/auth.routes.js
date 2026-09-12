const express = require('express');
const { register, login } = require('./auth.controller');
const authGuard = require('../../middleware/authGuard');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authGuard, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;