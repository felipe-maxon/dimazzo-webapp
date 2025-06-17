const { tb_usuarios } = require('../../models');
const bcrypt = require('bcrypt');

// Chave secreta que você vai definir
const SECRET_ADMIN_KEY = "dimazzomx2486";

// REGISTRAR NOVO USUÁRIO
async function register(req, res) {
  try {
    const { nome, email, telefone, senha, role, chave_secreta } = req.body;

    // Validações básicas
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
    }

    // Verificar se já existe o e-mail
    const usuarioExistente = await tb_usuarios.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já está cadastrado.' });
    }

    // Validar chave secreta se quiser ser admin
    let nivelAcesso = 'user'; // padrão
    if (role === 'admin') {
      if (chave_secreta !== SECRET_ADMIN_KEY) {
        return res.status(401).json({ error: 'Chave secreta inválida para cadastro de administrador.' });
      }
      nivelAcesso = 'admin';
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criar usuário
    const novoUsuario = await tb_usuarios.create({
      nome,
      email,
      telefone,
      senha_hash: senhaHash,
      role: nivelAcesso,
    });

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

// AUTENTICAÇÃO DE USUÁRIO
const jwt = require('jsonwebtoken');

// Sua chave secreta para gerar o token (no futuro, colocar no .env)
const JWT_SECRET = SECRET_ADMIN_KEY;

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await tb_usuarios.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role }, 
      JWT_SECRET, 
      { expiresIn: '12h' } // Token válido por 1 hora
    );

    return res.json({ 
      message: 'Login realizado com sucesso!',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

module.exports = {
  register,
  login
};