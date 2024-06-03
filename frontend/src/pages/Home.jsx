import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from '../components/NewsItem';

const Home = ({ searchQuery }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);

  const fetchNews = async () => {
    const { data } = await axios.get('/api/news', { withCredentials: true });
    setNews(data);
    setFilteredNews(data);
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(() => {
      fetchNews();
    }, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredNews(
        news.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredNews(news);
    }
  }, [searchQuery, news]);


  return (
    <div className="row">
      {filteredNews.map((item) => (
        <div key={item._id} className="col-md-4 mb-4">
          <NewsItem
            news={item}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
