// const express = require('express')
import express from 'express'
const router = express.Router()
import {
  getNews,
  setNews,
  updateNews,
  deleteNews,
  getNewsById
} from '../controllers/newsController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getNews).post(protect, setNews)
router.route('/:id').get(protect, getNewsById).delete(protect, deleteNews).put(protect, updateNews);


// module.exports = router
export default router