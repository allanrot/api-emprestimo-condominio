const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

router.post('/register', async (req, res) => {
    const passwordHash = await bcrypt.hash(
        req.body.password,
        10
    );

    const user = new User({
        name: req.body.name,
        apartment: req.body.apartment,
        phone: req.body.phone,
        email: req.body.email,
        password: passwordHash
    });

    await user.save();

    res.status(201).json({
        mensagem: 'Usuário criado'
    });
});


router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(401).json({
            mensagem: 'Usuário não encontrado'
        });
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!validPassword) {
        return res.status(401).json({
            mensagem: 'Senha inválida'
        });
    }

    const token = jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    res.json({
        token,
        userId: user._id,
        name: user.name
    });
});

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.json({
            name: user.name,
            apartment: user.apartment,
            phone: user.phone
        });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro interno no servidor', erro: error.message });
    }
});

module.exports = router;