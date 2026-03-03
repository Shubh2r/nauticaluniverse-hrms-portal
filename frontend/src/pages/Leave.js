import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leave() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/leave/my', { headers: { Authorization: token } })
      .then(res => setLeaves(res.data))
      .catch(err => console.error(err));
  }, []);

  const applyLeave = () => {
    const token = localStorage.getItem('token');
    axios.post('/leave/apply', { startDate, endDate, reason }, {
      headers: { Authorization: token }
    })
    .then(res => alert(res.data))
    .catch(err => alert(err.response.data));
  };

  const cancelLeave = (id) => {
    const token = localStorage.getItem('token');
    axios.put(`/leave/${id}/cancel`, {}, {
      headers: { Authorization: token }
    })
    .then(res => alert(res.data))
    .catch(err => alert(err.response.data));
  };

  return (
    <div>
      <h2>Apply for Leave</h2>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <input type="text" placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} />
      <button onClick={applyLeave}>Submit Leave Request</button>

      <h2>My Leaves</h2>
      {leaves.map(leave => (
        <div key={leave._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>From:</strong> {new Date(leave.startDate).toDateString()} - <strong>To:</strong> {new Date(leave.endDate).toDateString()}</p>
          <p><strong>Reason:</strong> {leave.reason}</p>
          <p><strong>Status:</strong> {leave.status}</p>
          <p><strong>Manager Comment:</strong> {leave.managerComment || 'N/A'}</p>
          {leave.status === 'Pending' && (
            <button onClick={() => cancelLeave(leave._id)}>Cancel Request</button>
          )}
        </div>
      ))}
    </div>
  );
}
