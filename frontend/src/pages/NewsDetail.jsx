import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css'

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      const { data } = await axios.get(`/api/news/${id}`, { withCredentials: true });
      setNews(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">Error loading news: {error.message}</div>;

  const { title, imageUrl, content } = news;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <h2 className="mb-4 text-center">{title}</h2>
          <div className="d-flex justify-content-center">
            <img src={imageUrl} alt={title} className="img-fluid mb-4" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
