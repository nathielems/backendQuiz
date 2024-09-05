import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;

// Conecte ao MongoDB (altere a string de conexão conforme necessário)
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/users', userRoutes);

// Rota inicial para verificar se o servidor está funcionando
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor está rodando');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
