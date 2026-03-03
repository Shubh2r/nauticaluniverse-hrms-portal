import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeePortal from './pages/EmployeePortal';
import AdminPortal from './pages/AdminPortal';
import Profile from './pages/Profile';
import ProfileApproval from './pages/ProfileApproval';
import Query from './pages/Query';   // ✅ NEW
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/employee" element={<EmployeePortal />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-approval" element={<ProfileApproval />} />
        <Route path="/query" element={<Query />} />   {/* ✅ NEW */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
