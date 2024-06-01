import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const News = mongoose.model('News', NewsSchema);
export default News

