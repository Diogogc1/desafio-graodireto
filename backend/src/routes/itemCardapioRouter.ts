import express from 'express';
const router = express.Router();
import itemCardapioController from '../controllers/itemCardapioController';

router.post('/', itemCardapioController.create);
router.get('/', itemCardapioController.getAll);
router.get('/:id', itemCardapioController.getById);
router.put('/:id', itemCardapioController.update);
router.delete('/:id', itemCardapioController.remove);

export default router;