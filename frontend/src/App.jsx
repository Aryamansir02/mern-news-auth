import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewsDetail from './pages/NewsDetail';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
