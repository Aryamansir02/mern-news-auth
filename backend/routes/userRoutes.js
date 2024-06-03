import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    addBookmark,
    removeBookmark,
    getUserBookmarks
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/bookmarks/:id', protect, addBookmark);
router.delete('/bookmarks/:id', protect, removeBookmark);
router.get('/bookmarks', protect, getUserBookmarks);

export default router;
