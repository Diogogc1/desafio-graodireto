import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';

router.post('/', userController.create);
router.get('/', userController.verifyFirebaseToken, userController.getAll);
router.get('/:id', userController.getById);
router.get('/uid/:uid', userController.getByUid);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;