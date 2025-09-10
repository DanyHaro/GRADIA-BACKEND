const { verifyAccessToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token proporcionado' });

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

module.exports = authenticate;
