import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileApproval() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/employee/all', { // you can create a route to list all employees
      headers: { Authorization: token }
    })
    .then(res => setEmployees(res.data))
    .catch(err => console.error(err));
  }, []);

  const approveUpdate = (id, approve) => {
    const token = localStorage.getItem('token');
    axios.put(`/employee/${id}/approve-update`, { approve }, {
      headers: { Authorization: token }
    })
    .then(res => alert(res.data))
    .catch(err => alert(err.response.data));
  };

  return (
    <div>
      <h2>Profile Update Approvals</h2>
      {employees.map(emp => (
        <div key={emp._id}>
          <p><strong>{emp.name}</strong> ({emp.role})</p>
          {emp.pendingUpdates && Object.keys(emp.pendingUpdates).length > 0 ? (
            <div>
              <p>Requested Updates: {JSON.stringify(emp.pendingUpdates)}</p>
              <button onClick={() => approveUpdate(emp._id, true)}>Approve</button>
              <button onClick={() => approveUpdate(emp._id, false)}>Reject</button>
            </div>
          ) : (
            <p>No pending updates</p>
          )}
        </div>
      ))}
    </div>
  );
}
