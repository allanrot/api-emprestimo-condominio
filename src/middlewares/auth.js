const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.replace(
        'Bearer ',
        ''
    );

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuarioId = decoded.usuarioId;

        next();

    } catch {
        return res.sendStatus(401);
    }
};