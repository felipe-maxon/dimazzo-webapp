const jwt = require('jsonwebtoken');

// Sua chave secreta
const JWT_SECRET = "dimazzomx2486";

// Middleware para verificar se o usuário está autenticado
function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Agora podemos acessar req.user.role, req.user.id, etc.
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
}

module.exports = autenticarToken;