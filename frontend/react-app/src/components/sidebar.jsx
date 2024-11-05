import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li><Link to="/create-event">Create Event</Link></li>
        <li><Link to="/view-event">View Event</Link></li>
        <li><Link to="/generate-certificate">Generate Certificate</Link></li>
        <li><Link to="/assign-participants">Assign Participants</Link></li> {/* New link added */}
      </ul>
    </div>
  );
}

export default Sidebar;
