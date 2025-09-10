// rolesPermitidos = array de roles que pueden acceder a la ruta
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Usuario no autenticado' });

    const userRoles = req.user.roles || [];
    const hasRole = roles.some(r => userRoles.includes(r));
    if (!hasRole) return res.status(403).json({ message: 'No autorizado' });

    next();
  };
};

module.exports = authorize;
