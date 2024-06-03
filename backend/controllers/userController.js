import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import News from '../models/newsModel.js';


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Add bookmark
// @route   POST /api/users/bookmarks/:id
// @access  Private
const addBookmark = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id);
    
    if (news) {
        const user = await User.findById(req.user._id);
        if (!user.bookmarks.includes(req.params.id)) {
            user.bookmarks.push(req.params.id);
            await user.save();
            res.status(201).json({ message: 'Bookmark added' });
        } else {
            res.status(400);
            throw new Error('News already bookmarked');
        }
    } else {
        res.status(404);
        throw new Error('News not found');
    }
});

// @desc    Remove bookmark
// @route   DELETE /api/users/bookmarks/:id
// @access  Private
const removeBookmark = asyncHandler(async (req, res) => {
    const news = await News.findById(req.params.id);

    if (news) {
        const user = await User.findById(req.user._id);
        if (user.bookmarks.includes(req.params.id)) {
            user.bookmarks = user.bookmarks.filter(
                (bookmarkId) => bookmarkId.toString() !== req.params.id
            );
            await user.save();
            res.status(200).json({ message: 'Bookmark removed' });
        } else {
            res.status(400);
            throw new Error('News not bookmarked');
        }
    } else {
        res.status(404);
        throw new Error('News not found');
    }
});

// @desc    Get user bookmarks
// @route   GET /api/users/bookmarks
// @access  Private
const getUserBookmarks = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('bookmarks');
    res.json({ bookmarks: user.bookmarks });
});

export {
    authUser,
    registerUser,
    logoutUser,
    addBookmark,
    removeBookmark,
    getUserBookmarks
};