import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeePortal from './pages/EmployeePortal';
import AdminPortal from './pages/AdminPortal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employee" element={<EmployeePortal />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

