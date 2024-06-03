import asyncHandler from 'express-async-handler'

import News from '../models/newsModel.js'
import User from '../models/userModel.js'

// @desc    Get news
// @route   GET /api/news
// @access  Private
const getNews = asyncHandler(async (req, res) => {
    const news = await News.find({})
    res.status(200).json(news)
})

// @desc    Set news
// @route   POST /api/news
// @access  Private
const setNews = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.imageUrl) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    const news = await News.create({
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl
    })

    res.status(200).json(news)
})

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private
const updateNews = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id);

    if (news) {
        news.title = req.body.title || news.title;
        news.content = req.body.content || news.content;
        news.imageUrl = req.body.imageUrl || news.imageUrl;

        const updatedNews = await news.save();

        res.json({
            _id: updatedNews._id,
            name: updatedNews.name,
            email: updatedNews.email,
        });
    }
    else {
        res.status(400);
        throw new Error('News not found');
    }
});
// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private
const deleteNews = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id)

    if (!news) {
        res.status(400)
        throw new Error('News not found')
    }

    await news.deleteOne()

    res.status(200).json({ id: req.params.id })
})


// @desc    Get news by ID
// @route   GET /api/news/:id
// @access  Private
const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  if (news) {
    res.json(news);
  } else {
    res.status(404);
    throw new Error('News not found');
  }
});



export {
    getNews,
    setNews,
    updateNews,
    deleteNews,
    getNewsById
}

// CRUD for news added