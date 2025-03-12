import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './Pages/Blog';
import Favourite from './Pages/Favourite';
import HotelList from './Pages/Hotels';
import HotelDetails from './Pages/HotelDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Layout from './Components/Layout';
import AboutUs from './Pages/About';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotels/details/:id" element={<HotelDetails />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="*" element={<Blog />} />
          <Route path="/aboutus" element={<AboutUs />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
