import React, { useState } from 'react';
import axios from 'axios';

export default function Query() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const raiseQuery = () => {
    const token = localStorage.getItem('token');
    axios.post('/query/raise', { subject, description }, {
      headers: { Authorization: token }
    })
    .then(res => alert(res.data))
    .catch(err => alert(err.response.data));
  };

  return (
    <div>
      <h2>Raise a Query</h2>
      <input 
        type="text" 
        placeholder="Subject" 
        value={subject} 
        onChange={e => setSubject(e.target.value)} 
      />
      <textarea 
        placeholder="Describe your issue" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
      />
      <button onClick={raiseQuery}>Submit Query</button>
    </div>
  );
}
