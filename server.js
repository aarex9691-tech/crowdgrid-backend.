const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const eventRoutes = require('./modules/event/event.routes');
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Security Middlewares
app.use(helmet());
//app.use(mongoSanitize());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', apiLimiter);


// Routes will go here later
app.get('/health', (req, res) => res.send('Server is running'));

// Routes
app.use('/api/auth', require('./modules/auth/auth.routes')); // <-- This was missing!
app.use('/api/events', require('./modules/event/event.routes'));
app.use('/api/volunteer', require('./modules/volunteer/volunteer.routes'));
app.use('/api/corporate', require('./modules/corporate/corporate.routes'));
app.use('/api/pass', require('./modules/pass/pass.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));