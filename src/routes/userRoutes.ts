import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// Obter todos os usuários
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Criar um novo usuário
router.post('/', async (req: Request, res: Response) => {
  const { id, password } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO users (id, password) VALUES (?, ?)', [id, password]);
    res.status(201).json({ id, password });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
