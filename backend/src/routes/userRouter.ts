import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);