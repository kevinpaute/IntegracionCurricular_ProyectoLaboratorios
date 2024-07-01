const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const user = await prisma.usuario.findUnique({ where: { id_usuario: req.user.id_usuario }, include: { Roles: true } });
    
    if (!user || !roles.includes(user.Roles.nombre_rol)) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };
