import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    addBookmark,
    removeBookmark
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/bookmarks/:id', protect, addBookmark);
router.delete('/bookmarks/:id', protect, removeBookmark);

export default router;
