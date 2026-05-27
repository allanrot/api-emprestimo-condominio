const express = require('express');
const router = express.Router();

const Item = require('../models/item');

router.get('/', async (req, res) => {
    const items = await Item.find();

    res.json(items);
});

router.post('/', async (req, res) => {
    const novoItem = new Item({
        nome: req.body.nome,
        descricao: req.body.descricao
    });

    await novoItem.save();

    res.status(201).json(novoItem);
});

module.exports = router;