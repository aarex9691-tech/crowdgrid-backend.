const User = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId, globalRole) => {
    return jwt.sign({ id: userId, globalRole }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = async (name, email, password, requestedRole) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    // Security check: Prevent users from self-assigning ADMIN role
    let roleToAssign = 'USER';
    if (requestedRole === 'HOST') {
        roleToAssign = 'HOST';
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        passwordHash,
        globalRole: roleToAssign,
    });

    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            globalRole: user.globalRole,
            token: generateToken(user._id, user.globalRole),
        };
    } else {
        throw new Error('Invalid user data');
    }
};
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        globalRole: user.globalRole,
        token: generateToken(user._id, user.globalRole),
    };
};

module.exports = { registerUser, loginUser };