import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import testRoutes from './routes/testRoutes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from './db'; 

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/test', testRoutes)

app.post('/login', async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).send('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Senha incorreta');
    }

    const token = jwt.sign({ id: user.id, user: user.name }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao fazer login');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
