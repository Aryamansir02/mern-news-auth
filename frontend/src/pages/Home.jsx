import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from '../components/NewsItem';

const Home = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const { data } = await axios.get('/api/news', { withCredentials: true });
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(() => {
      fetchNews();
    }, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="row">
      {news.map((item) => (
        <div key={item._id} className="col-md-4 mb-4">
          <NewsItem news={item} />
        </div>
      ))}
    </div>
  );
};

export default Home;
