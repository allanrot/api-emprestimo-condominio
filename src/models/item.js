const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        default: true
    },
    rentPricing: {
        type: Number,
        required: false
    },
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema);