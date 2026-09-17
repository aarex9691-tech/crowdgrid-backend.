const Pass = require('./pass.model');
const { Event } = require('../event/event.model');
const QRCode = require('qrcode');

const generatePass = async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user._id;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const existingPass = await Pass.findOne({ eventId, userId });
        if (existingPass) return res.status(400).json({ message: 'You already have a pass for this event' });

        // --- RESOURCE ALLOCATOR (Box 4) ---
        if (event.eventType === 'PilgrimEvent') {
            // Check if we have beds left
            if (event.inventory.bedsAvailable <= 0) {
                return res.status(400).json({ message: 'Sorry, this event is at maximum capacity for beds.' });
            }

            // Atomically decrement beds and meals by 1
            await Event.findByIdAndUpdate(eventId, {
                $inc: {
                    'inventory.bedsAvailable': -1,
                    'inventory.mealsAvailable': -1
                }
            });
        }
        // ----------------------------------

        // 1. Initialize the pass
        const newPass = new Pass({ eventId, userId });

        // 2. Create and attach the QR Code
        const qrPayload = JSON.stringify({
            passId: newPass._id,
            eventId: eventId,
            userId: userId
        });
        const qrCodeImage = await QRCode.toDataURL(qrPayload);

        newPass.qrCode = qrCodeImage;
        await newPass.save();

        res.status(201).json(newPass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyPasses = async (req, res) => {
    try {
        const passes = await Pass.find({ userId: req.user._id }).populate('eventId', 'title eventType');
        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const scanPass = async (req, res) => {
    try {
        const { passId } = req.body;

        // 1. Find the ticket in the database
        const pass = await Pass.findById(passId).populate('eventId', 'title');
        if (!pass) return res.status(404).json({ message: 'Pass not found.' });

        // 2. Check for double-scanning (The Bouncer Logic)
        if (pass.status === 'Used') {
            return res.status(400).json({
                message: 'Alert: This ticket has already been used!'
            });
        }

        if (pass.status === 'Cancelled') {
            return res.status(400).json({ message: 'Alert: This ticket was cancelled.' });
        }

        // 3. Mark as Used and save
        pass.status = 'Used';
        await pass.save();

        res.status(200).json({
            message: 'Success: Ticket verified and marked as Used.',
            event: pass.eventId.title
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Don't forget to add scanPass to your exports at the very bottom!
module.exports = { generatePass, getMyPasses, scanPass };