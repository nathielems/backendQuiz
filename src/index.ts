import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
