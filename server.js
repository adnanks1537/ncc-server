const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string
const uri = "mongodb+srv://adnankstheredteamlabs:Adnan%4066202@cluster0.qrppz7h.mongodb.net/ncc_cadet_db?retryWrites=true&w=majority";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Cadet schema and model
const cadetSchema = new mongoose.Schema({
    cadetId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rank: { type: String, required: true },
    unit: { type: String, required: true }
});

const Cadet = mongoose.model('Cadet', cadetSchema);

// Endpoint to get cadet information by cadetId
app.get('/cadet/:id', async (req, res) => {
    const cadetId = req.params.id;
    console.log('Searching for Cadet ID:', cadetId);

    try {
        const cadet = await Cadet.findOne({ cadetId: new RegExp(`^${cadetId}$`, 'i') });

        if (!cadet) {
            console.log('Cadet not found');
            return res.status(404).json({ message: 'Cadet not found' });
        }

        console.log('Cadet found:', cadet);
        res.json(cadet);
    } catch (error) {
        console.error('Error occurred while searching for cadet:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Endpoint to register a new cadet
app.post('/register', async (req, res) => {
    const { cadetId, name, rank, unit } = req.body;

    // Validate the request body
    if (!cadetId || !name || !rank || !unit) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if cadetId already exists
        const existingCadet = await Cadet.findOne({ cadetId: new RegExp(`^${cadetId}$`, 'i') });
        if (existingCadet) {
            return res.status(409).json({ message: 'Cadet ID already exists' });
        }

        // Create a new cadet
        const newCadet = new Cadet({ cadetId, name, rank, unit });
        await newCadet.save();

        console.log('New cadet registered:', newCadet);
        res.status(201).json({ message: 'Cadet registered successfully', cadet: newCadet });
    } catch (error) {
        console.error('Error occurred while registering cadet:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
