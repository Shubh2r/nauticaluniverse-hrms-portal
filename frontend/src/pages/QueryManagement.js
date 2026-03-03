import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function QueryManagement() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/query/all', {
      headers: { Authorization: token }
    })
    .then(res => setQueries(res.data))
    .catch(err => console.error(err));
  }, []);

  const respondToQuery = (id, hrResponse, status) => {
    const token = localStorage.getItem('token');
    axios.put(`/query/${id}/respond`, { hrResponse, status }, {
      headers: { Authorization: token }
    })
    .then(res => alert(res.data))
    .catch(err => alert(err.response.data));
  };

  const closeQuery = (id) => {
    const token = localStorage.getItem('token');
    axios.put(`/query/${id}/respond`, { status: 'Closed', hrResponse: 'Ticket closed by HR' }, {
      headers: { Authorization: token }
    })
    .then(res => alert(res.data))
    .catch(err => alert(err.response.data));
  };

  return (
    <div>
      <h2>HR Query Management</h2>
      {queries.map(query => (
        <div key={query._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>Employee:</strong> {query.employee?.name} ({query.employee?.email})</p>
          <p><strong>Subject:</strong> {query.subject}</p>
          <p><strong>Description:</strong> {query.description}</p>
          <p><strong>Status:</strong> {query.status}</p>
          <p><strong>HR Response:</strong> {query.hrResponse || 'No response yet'}</p>

          <textarea 
            placeholder="Write HR response..." 
            onChange={e => query.hrResponse = e.target.value} 
          />
          <select onChange={e => query.status = e.target.value}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <button onClick={() => respondToQuery(query._id, query.hrResponse, query.status)}>
            Submit Response
          </button>
          <button onClick={() => closeQuery(query._id)} style={{ marginLeft: '10px', color: 'red' }}>
            Close Query
          </button>
        </div>
      ))}
    </div>
  );
}
