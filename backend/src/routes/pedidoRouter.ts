import express from 'express';
const router = express.Router();
import pedidoController from '../controllers/pedidoController';

router.post('/', pedidoController.create);
router.get('/', pedidoController.getAll);
router.get('/:id', pedidoController.getById);
router.put('/:id', pedidoController.update);
router.delete('/:id', pedidoController.remove);

export default router;