import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
// import Register from './pages/Register';
import NewsDetail from './pages/NewsDetail';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <>
    <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route index element={<LoginRegister />} />
          <Route path="/news" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
