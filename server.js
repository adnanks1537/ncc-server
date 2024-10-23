const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

// Replace <db_password> with the actual password and encode any special characters if needed.
const mongoUri = 'mongodb+srv://adnankstheredteamlabs:Adnan%4066202@cluster0.qrppz7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas successfully!'))
    .catch((error) => console.log('Error connecting to MongoDB Atlas:', error));

// Create a basic Cadet schema and model for MongoDB
const cadetSchema = new mongoose.Schema({
    cadetId: String,
    name: String,
    rank: String,
    unit: String,
});

const Cadet = mongoose.model('Cadet', cadetSchema);

// Example API route to get cadet info by cadet ID
app.get('/cadet/:cadetId', async (req, res) => {
    const cadetId = req.params.cadetId;

    try {
        const cadet = await Cadet.findOne({ cadetId: cadetId });
        if (!cadet) {
            return res.status(404).json({ error: 'Cadet not found' });
        }

        res.json(cadet);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cadet info' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
