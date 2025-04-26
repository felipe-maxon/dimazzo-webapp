const express = require('express');
const cors = require('cors');
const app = express();

// Importar rotas
const authRoutes = require('./routes/authRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Usar as rotas
app.use('/api', authRoutes);

// Porta
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});