import React from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({ news }) => {
  return (
    <div className="card h-100">
      <img src={news.imageUrl} className="card-img-top" alt={news.title} style={{ maxHeight: '200px', objectFit: 'cover' }} />
      <div className="card-body">
        <h5 className="card-title">{news.title}</h5>
        <p className="card-text">{news.content.substring(0, 100)}...</p>
        <Link to={`/news/${news._id}`} className="btn btn-primary">Read More</Link>
      </div>
    </div>
  );
};

export default NewsItem;
