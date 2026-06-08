const express = require('express');
const router = express.Router();

const Item = require('../models/item');
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
    const items = await Item.find();

    res.json(items);
});

router.get('/me', async (req, res) => {
    const items = await Item.find({ userId: req.userId });

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

module.exports = router;