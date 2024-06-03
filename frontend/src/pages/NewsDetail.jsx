import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});

  const fetchNews = async () => {
    const { data } = await axios.get(`/api/news/${id}`, { withCredentials: true });
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, [id]);

  return (
    <div className="row justify-content-md-center">
      <div className="col-md-8">
        <h2>{news.title}</h2>
        <img src={news.imageUrl} alt={news.title} className="img-fluid mb-3" />
        <p>{news.content}</p>
      </div>
    </div>
  );
}

export default NewsDetail