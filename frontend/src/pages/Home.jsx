import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from '../components/NewsItem';

const Home = ({ searchQuery }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const fetchNews = async () => {
    try {
      const { data } = await axios.get('/api/news', { withCredentials: true });
      setNews(data);
      setFilteredNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const { data } = await axios.get('/api/users/bookmarks', { withCredentials: true });
      setBookmarks(data.bookmarks.map((bookmark) => bookmark._id));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchBookmarks();
    const interval = setInterval(() => {
      fetchNews();
      fetchBookmarks();
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

  const handleBookmarkToggle = (newsId) => {
    if (bookmarks.includes(newsId)) {
      setBookmarks(bookmarks.filter((id) => id !== newsId));
    } else {
      setBookmarks([...bookmarks, newsId]);
    }
  };

  return (
    <div className="row">
      {filteredNews.map((item) => (
        <div key={item._id} className="col-md-4 mb-4">
          <NewsItem
            news={item}
            isBookmarked={bookmarks.includes(item._id)}
            onBookmarkToggle={handleBookmarkToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
