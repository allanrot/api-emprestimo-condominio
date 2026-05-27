const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    disponivel: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Item', itemSchema);