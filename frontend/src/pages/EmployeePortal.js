import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeePortal() {
  const [profile, setProfile] = useState(null);
  const [updates, setUpdates] = useState({ phone: '', address: '' });

  useEffect(() => {
    const token = localStorage.getItem('token'); // JWT stored after login
    axios.get('/employee/profile', {
      headers: { Authorization: token }
    })
    .then(res => setProfile(res.data))
    .catch(err => console.error(err));
  }, []);

  const requestUpdate = () => {
    const token = localStorage.getItem('token');
    axios.put('/employee/profile/request-update', updates, {
      headers: { Authorization: token }
    })
    .then(res => alert(res.data))
    .catch(err => alert(err.response.data));
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <h3>My Profile</h3>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Department:</strong> {profile.department}</p>
      <p><strong>Designation:</strong> {profile.designation}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Date of Joining:</strong> {profile.dateOfJoining ? new Date(profile.dateOfJoining).toDateString() : 'N/A'}</p>

      <h3>Request Profile Update</h3>
      <input 
        type="text" 
        placeholder="New Phone" 
        value={updates.phone} 
        onChange={e => setUpdates({ ...updates, phone: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="New Address" 
        value={updates.address} 
        onChange={e => setUpdates({ ...updates, address: e.target.value })} 
      />
      <button onClick={requestUpdate}>Submit Update Request</button>
    </div>
  );
}
