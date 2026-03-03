import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Calendar() {
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch attendance records
    axios.get('/attendance/my', { headers: { Authorization: token } })
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err));

    // Fetch approved leaves
    axios.get('/leave/my', { headers: { Authorization: token } })
      .then(res => {
        const approvedLeaves = res.data.filter(l => l.status === 'Approved');
        setLeaves(approvedLeaves);
      })
      .catch(err => console.error(err));
  }, []);

  // Helper: check if date is in attendance
  const isPresent = (date) => {
    return attendance.some(a => new Date(a.date).toDateString() === date.toDateString() && a.status === 'Present');
  };

  // Helper: check if date is in approved leave
  const isLeave = (date) => {
    return leaves.some(l => date >= new Date(l.startDate) && date <= new Date(l.endDate));
  };

  // Generate current month days
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  return (
    <div>
      <h2>My Calendar</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {days.map((day, idx) => {
          let bgColor = '#fff';
          if (isPresent(day)) bgColor = '#c8e6c9'; // green for present
          else if (isLeave(day)) bgColor = '#ffccbc'; // orange for leave
          else bgColor = '#f0f0f0'; // grey for absent/other

          return (
            <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', background: bgColor }}>
              {day.getDate()}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '20px' }}>
        <p><span style={{ background: '#c8e6c9', padding: '2px 6px' }}> Present </span></p>
        <p><span style={{ background: '#ffccbc', padding: '2px 6px' }}> Leave </span></p>
        <p><span style={{ background: '#f0f0f0', padding: '2px 6px' }}> Absent/Other </span></p>
      </div>
    </div>
  );
}
