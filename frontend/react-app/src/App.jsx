import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/login/Login.jsx';

function App() {

  return (
    <Router> 
      <Routes>
        <Route path="/" element={<h1>HI</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

