import express from 'express';
import {login, register, changePassword, verifyToken, isAdmin, getUser} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.put('/password',verifyToken, changePassword);
router.get('/isadmin', verifyToken, isAdmin);
router.get('/getme', verifyToken, getUser);

export default router;