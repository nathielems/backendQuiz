import { Router, Request, Response } from 'express';
import User from '../models/userModel';

const router = Router();

// Obter todos os usuários
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo usuário
router.post('/', async (req: Request, res: Response) => {
  const user = new User({
    id: req.body.id,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
