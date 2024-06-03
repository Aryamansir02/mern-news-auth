import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css'; // Ensure this path is correct based on your project structure

const NewsItem = ({ news, isBookmarked, onBookmarkToggle }) => {
  const bookmarkHandler = async () => {
    try {
      if (isBookmarked) {
        await axios.delete(`/api/users/bookmarks/${news._id}`, { withCredentials: true });
      } else {
        await axios.post(`/api/users/bookmarks/${news._id}`, {}, { withCredentials: true });
      }
      onBookmarkToggle(news._id);
    } catch (error) {
      console.error('Error handling bookmark:', error);
    }
  };

  return (
    <div className="card h-100">
      <img src={news.imageUrl} className="card-img-top" alt={news.title} />
      <div className="card-body d-flex flex-column">
        <div>
          <h5 className="card-title">{news.title}</h5>
          <p className="card-text">{news.content.substring(0, 100)}...</p>
        </div>
        <div className="card-footer mt-auto">
          <Link to={`/news/${news._id}`} className="btn btn-primary">Read More</Link>
          <button
            className={`btn ${isBookmarked ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={bookmarkHandler}>
            {isBookmarked ? 'Unbookmark' : 'Bookmark'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
