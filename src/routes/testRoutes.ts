import { Router, Request, Response } from 'express';
import { saveVocationalResult, getVocationalResult } from '../controllers/testController';

const router = Router();

router.post('/save-vocational-result', async (req, res) => {
  const { user_id, maxOption } = req.body;

  async function trySaveVocationalResult(attempt = 1) {
    try {
      await saveVocationalResult(user_id, maxOption);
      res.status(200).send('Vocational result saved successfully');
    } catch (error) {
      if (attempt < 2) {
        console.log(`Tentativa ${attempt} falhou. Tentando novamente...`);
        trySaveVocationalResult(attempt + 1); 
      } else {
        console.error('Erro ao salvar resultado vocacional:', error);
        res.status(500).send('Error saving vocational result'); 
      }
    }
  }

  trySaveVocationalResult();
});

router.get('/get-vocational-result', async (req, res) => {
  const userId = parseInt(req.query.user_id as string, 10);

  if (isNaN(userId)) {
    return res.status(400).send('Invalid user_id');
  }

  async function tryGetVocationalResult(attempt = 1) {
    try {
      const result = await getVocationalResult(userId);
      res.status(200).json(result);
    } catch (error) {
      if (attempt < 2) {
        console.log(`Tentativa ${attempt} falhou. Tentando novamente...`);
        tryGetVocationalResult(attempt + 1); 
      } else {
        console.error('Erro ao buscar resultado vocacional:', error);
        res.status(500).send('Error getting vocational result'); 
      }
    }
  }

  tryGetVocationalResult();
});

export default router;
