import express from 'express';
import { createManyUsers, createUser, deleteManyUsers, deleteUser, findUser, getAllUsers, updateManyUsers, updateUser } from '../controllers/userController.js';


// Router middleware
const router = express.Router();

// create routes
// GET
router.get('/', getAllUsers);
router.get('/finduser', findUser);

// POST
router.post('/createuser', createUser);
router.post('/createmany', createManyUsers);

// PUT
router.put('/:id', updateUser);
router.put('/', updateManyUsers);

// DELETE
router.delete('/:id', deleteUser);
router.delete('/', deleteManyUsers);

export default router;
