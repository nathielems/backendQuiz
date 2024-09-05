import express from 'express';
import connection from './db';

const app = express();
app.use(express.json()); // Para interpretar JSON

// Rota para obter todos os usuários
app.get('/users', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar usuários');
  }
});

// Rota para adicionar um novo usuário
app.post('/users', async (req, res) => {
  const { id, password } = req.body;
  try {
    await connection.query('INSERT INTO users (id, password) VALUES (?, ?)', [id, password]);
    res.status(201).send('Usuário adicionado com sucesso');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao adicionar usuário');
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
