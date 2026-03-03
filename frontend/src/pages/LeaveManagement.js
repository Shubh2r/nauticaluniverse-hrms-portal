import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/leave/all', { headers: { Authorization: token } })
      .then(res => setLeaves(res.data))
      .catch(err => console.error(err));
  }, []);

  const respondLeave = (id, approve, comment) => {
    const token = localStorage.getItem('token');
    axios.put(`/leave/${id}/respond`, { approve, comment }, {
      headers: { Authorization: token }
    })
    .then(res => alert(res.data))
    .catch(err => alert(err.response.data));
  };

  return (
    <div>
      <h2>Leave Management</h2>
      {leaves.map(leave => (
        <div key={leave._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>Employee:</strong> {leave.employee?.name} ({leave.employee?.email})</p>
          <p><strong>From:</strong> {new Date(leave.startDate).toDateString()} - <strong>To:</strong> {new Date(leave.endDate).toDateString()}</p>
          <p><strong>Reason:</strong> {leave.reason}</p>
          <p><strong>Status:</strong> {leave.status}</p>
          <textarea placeholder="Manager Comment" onChange={e => leave.managerComment = e.target.value}></textarea>
          <button onClick={() => respondLeave(leave._id, true, leave.managerComment)}>Approve</button>
          <button onClick={() => respondLeave(leave._id, false, leave.managerComment)}>Reject</button>
        </div>
      ))}
    </div>
  );
}
