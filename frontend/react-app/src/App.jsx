import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Admin from './views/admin/Admin';
import Event from './views/admin/Event';
import View from './views/admin/View';
import Certificate from './views/admin/Certificate';
import Sidebar from './components/sidebar';
import Login from './views/login/Login';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      {/* Conditionally render Sidebar only if not on the login page */}
      {!isLoginPage && <Sidebar />}

      <Routes>
        <Route path="/create-event" element={<Admin />} />
        <Route path="/view-event" element={<View />} />
        <Route path="/generate-certificate" element={<Certificate />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/event" element={<Event />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
