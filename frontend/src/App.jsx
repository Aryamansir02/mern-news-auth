import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import NewsDetail from './pages/NewsDetail';
import Navbar from './components/Navbar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <div className="container mt-3">
        <Routes>
          <Route index element={<LoginRegister />} />
          <Route path="/news" element={<Home searchQuery={searchQuery} />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
