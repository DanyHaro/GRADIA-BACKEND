const crypto = require('crypto');

module.exports = {
    generateRefreshToken: () => {
        const tokenPlain = crypto.randomBytes(64).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(tokenPlain).digest('hex');
        return { tokenPlain, tokenHash };
    }
};
