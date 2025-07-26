import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '../src/component/Container';
import Navbar from './Layout/Navbar';
import UrlShortenerUI from '../src/pages/UrlShortenerUI';
import Login from '../src/pages/Login';
import Registration from '../src/pages/Registration';
import Dashboard from '../src/pages/Dashbord'; 

const App = () => {
  return (
    <Router>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<UrlShortenerUI />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
