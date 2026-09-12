const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes will go here later
app.get('/health', (req, res) => res.send('Server is running'));

// Routes
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/event', require('./modules/event/event.routes'));
app.use('/api/volunteer', require('./modules/volunteer/volunteer.routes'));
app.use('/api/corporate', require('./modules/corporate/corporate.routes'));
app.use('/api/pass', require('./modules/pass/pass.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));