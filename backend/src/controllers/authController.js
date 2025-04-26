const { tb_usuarios } = require('../../models');
const bcrypt = require('bcrypt');

// Chave secreta que você vai definir
const SECRET_ADMIN_KEY = "dimazzomx2486";

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

module.exports = {
  register
};