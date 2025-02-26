import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './Pages/Blog';
import Favourite from './Pages/Favourite';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Components/Navbar';
import HotelList from './Pages/Hotels';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="*" element={<Navbar/>} />
      </Routes>
    </Router>
  );
}

export default App;
