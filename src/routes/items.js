const express = require('express');
const router = express.Router();

const Item = require('../models/item-model');
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
    const items = await Item.find();

    res.json(items);
});

router.get('/me', auth, async (req, res) => {
    const items = await Item.find({ userId: req.userId });

    res.json(items);
});

router.get('/:id', auth, async (req, res) => {
    const items = await Item.findOne({ _id: req.params.id, userId: req.userId });

    res.json(items);
});

router.post('/', auth, async (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        rentPricing: req.body.rentPricing,
        userId: req.userId
    });

    await newItem.save();

    res.status(201).json(newItem);
});

router.put('/:id', auth, async (req, res) => {
    const updatedItem = await Item.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        {
            name: req.body.name,
            description: req.body.description,
            rentPricing: req.body.rentPricing
        },
        { new: true }
    );

    if (!updatedItem) {
        return res.status(404).json({ message: "Item não encontrado ou usuário não autorizado" });
    }

    res.json(updatedItem);
});

router.patch('/:id/change-status', auth, async (req, res) => {
    const alteredItem = await Item.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        { available: req.available },
        { new: true }
    );

    if (!alteredItem) {
        return res.status(404).json({ message: "Item não encontrado ou usuário não autorizado" });
    }

    res.json(alteredItem);
});

router.delete('/:id', auth, async (req, res) => {
    const deletedItem = await Item.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId
    });

    if (!deletedItem) {
        return res.status(404).json({ message: "Item não encontrado ou usuário não autorizado" });
    }

    res.json({ message: "Item removido com sucesso" });
});

module.exports = router;