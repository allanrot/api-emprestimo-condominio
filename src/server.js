require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const itemsRoutes = require('./routes/items');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error(error);
    });

app.use('/items', itemsRoutes);

app.get('/', (req, res) => {
    res.send('API running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});