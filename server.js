const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

// Enable CORS for requests from GitHub Pages
app.use(cors({
    origin: 'https://adnanks1537.github.io'  // Replace with your GitHub Pages URL
}));

const port = process.env.PORT || 5000;

// MongoDB connection string
const mongoUri = 'mongodb+srv://adnankstheredteamlabs:Adnan%4066202@cluster0.qrppz7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas successfully!'))
    .catch((error) => console.log('Error connecting to MongoDB Atlas:', error));

// Cadet Schema and Model
const cadetSchema = new mongoose.Schema({
    cadetId: String,
    name: String,
    rank: String,
    unit: String,
});

const Cadet = mongoose.model('Cadet', cadetSchema);

// Route to fetch cadet info by ID
app.get('/cadet/:id', async (req, res) => {
    try {
        // Perform case-insensitive search for cadet ID
        const cadet = await Cadet.findOne({ cadetId: new RegExp(`^${req.params.id}$`, 'i') });
        if (!cadet) {
            return res.status(404).json({ message: 'Cadet not found' });
        }
        res.json(cadet);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
