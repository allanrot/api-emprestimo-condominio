const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/registrar', async (req, res) => {

    const senhaHash = await bcrypt.hash(
        req.body.senha,
        10
    );

    const usuario = new Usuario({
        nome: req.body.nome,
        apartamento: req.body.apartamento,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: senhaHash
    });

    await usuario.save();

    res.status(201).json({
        mensagem: 'Usuário criado'
    });
});


router.post('/login', async (req, res) => {
    const usuario = await Usuario.findOne({
        email: req.body.email
    });

    if (!usuario) {
        return res.status(401).json({
            mensagem: 'Usuário não encontrado'
        });
    }

    const senhaValida = await bcrypt.compare(
        req.body.senha,
        usuario.senha
    );

    if (!senhaValida) {
        return res.status(401).json({
            mensagem: 'Senha inválida'
        });
    }

    const token = jwt.sign(
        {
            usuarioId: usuario._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    res.json({
        token,
        usuarioId: usuario._id,
        nome: usuario.nome
    });
});

module.exports = router;