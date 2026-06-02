const express = require('express');
const router = express.Router();

const Item = require('../models/item');
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
    const items = await Item.find();

    res.json(items);
});

router.post('/', auth, async (req, res) => {
    const novoItem = new Item({
        nome: req.body.nome,
        descricao: req.body.descricao,
        usuarioId: req.usuarioId
    });

    await novoItem.save();

    res.status(201).json(novoItem);
});

module.exports = router;