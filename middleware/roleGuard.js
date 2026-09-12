const roleGuard = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.globalRole) {
            return res.status(401).json({ message: 'Not authorized, no user role found' });
        }

        if (!allowedRoles.includes(req.user.globalRole)) {
            return res.status(403).json({ message: 'Forbidden, insufficient permissions' });
        }

        next();
    };
};

module.exports = roleGuard;
