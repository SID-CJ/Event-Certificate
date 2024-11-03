import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './views/admin/Admin';
import Event from './views/admin/Event';
import View from './views/admin/View';
import Certificate from './views/admin/Certificate';
import Sidebar from './components/sidebar';
function App() {
  return (
    <Router>
      <Sidebar/>
      <Routes>
        <Route path="/create-event" element={<Admin />} />
        <Route path="/view-event" element={<View />} />
        <Route path="/generate-certificate" element={<Certificate />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/event" element={<Event />} />
      </Routes>
    </Router>
  );
}

export default App;
