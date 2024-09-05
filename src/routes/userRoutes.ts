import { Router, Request, Response } from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { saveVocationalResult } from '../controllers/userController';


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

router.post('/save-vocational-result', async (req, res) => {
  const { user_id, maxOption, result, detailsResult } = req.body;

  try {
    await saveVocationalResult(user_id, result, detailsResult);
    res.status(200).send('Vocational result saved successfully');
  } catch (error) {
    res.status(500).send('Error saving vocational result');
  }
});

export default router;
