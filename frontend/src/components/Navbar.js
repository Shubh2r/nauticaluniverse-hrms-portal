import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#f0f0f0' }}>
      <Link to="/employee" style={{ marginRight: '15px' }}>Employee Dashboard</Link>
      <Link to="/profile" style={{ marginRight: '15px' }}>My Profile</Link>
      <Link to="/query" style={{ marginRight: '15px' }}>Raise Query</Link>
      <Link to="/admin" style={{ marginRight: '15px' }}>Admin Dashboard</Link>
      <Link to="/profile-approval" style={{ marginRight: '15px' }}>Profile Approvals</Link>
      <Link to="/query-management" style={{ marginRight: '15px' }}>Manage Queries</Link>
    </nav>
  );
}
