const { registerUser, loginUser } = require('./auth.service');

const register = async (req, res) => {
    try {
        const { name, email, password, globalRole } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const newUser = await registerUser(name, email, password, globalRole);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const user = await loginUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { register, login };