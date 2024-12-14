import express from 'express';
const router = express.Router();
import itemPedidoController from '../controllers/itemPedidoController';

router.post('/', itemPedidoController.create);
router.get('/forPedido/:idPedido', itemPedidoController.getAllForPedido);
router.get('/:id', itemPedidoController.getById);
router.put('/:id', itemPedidoController.update);
router.delete('/:id', itemPedidoController.remove);

export default router;