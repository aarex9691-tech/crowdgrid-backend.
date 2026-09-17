const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    let token;

    // Look for the token in the standard Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized: No token provided' });
    }

    try {
        // Verify the token using your secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the real decoded user payload!
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized: Token is invalid or expired' });
    }
};

module.exports = { requireAuth };