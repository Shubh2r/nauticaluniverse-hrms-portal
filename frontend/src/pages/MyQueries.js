import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyQueries() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/query/my', {
      headers: { Authorization: token }
    })
    .then(res => setQueries(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>My Queries</h2>
      {queries.length === 0 ? (
        <p>No queries raised yet.</p>
      ) : (
        queries.map(query => (
          <div key={query._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>Subject:</strong> {query.subject}</p>
            <p><strong>Description:</strong> {query.description}</p>
            <p><strong>Status:</strong> {query.status}</p>
            <p><strong>HR Response:</strong> {query.hrResponse || 'No response yet'}</p>
          </div>
        ))
      )}
    </div>
  );
}
