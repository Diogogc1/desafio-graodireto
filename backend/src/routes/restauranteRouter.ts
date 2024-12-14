import express from 'express';
const router = express.Router();
import restauranteController from '../controllers/restauranteController';

router.post('/', restauranteController.create);
router.get('/', restauranteController.getAll);
router.get('/:id', restauranteController.getById);
router.get('/search/:termo', restauranteController.search);
router.put('/:id', restauranteController.update);
router.delete('/:id', restauranteController.remove);

export default router;