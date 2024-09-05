import { Router, Request, Response } from 'express';
import { createUser, getUsers } from '../controllers/userController'; 

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const newUser = await createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user' });
  }
});

export default router;
