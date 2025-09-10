const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    signAccessToken: (payload) => {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
        });
    },

    verifyAccessToken: (token) => {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            throw new Error('Access token inválido o expirado');
        }
    }
};
