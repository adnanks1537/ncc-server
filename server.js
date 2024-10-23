const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Cadet schema
const cadetSchema = new mongoose.Schema({
    cadetId: String,
    name: String,
    rank: String,
    unit: String
});

const Cadet = mongoose.model('Cadet', cadetSchema);

// API to get cadet information by ID
app.get('/cadet/:id', async (req, res) => {
    try {
        const cadet = await Cadet.findOne({ cadetId: req.params.id });
        if (!cadet) {
            return res.status(404).send({ error: 'Cadet not found' });
        }
        res.send(cadet);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching cadet information' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
