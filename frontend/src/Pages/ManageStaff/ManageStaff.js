// ManageStaff.js
import React, { useState, useEffect } from 'react';
import './manageStaff.css'; // Import the CSS file

function ManageStaff() {
  const [newStaff, setNewStaff] = useState({
    username: '',
    password: '',
    name: '',
    position: '',
  });
  const [staffList, setStaffList] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    // Load staff members from local storage on component mount
    const storedStaff = localStorage.getItem('staffList');
    if (storedStaff) {
      setStaffList(JSON.parse(storedStaff));
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };
  const handleAddStaff = () => {
    const updatedStaffList = [...staffList, newStaff];
    setStaffList(updatedStaffList);

    // Save staff list to local storage
    localStorage.setItem('staffList', JSON.stringify(updatedStaffList));
    setNewStaff({ username: '', password: '', name: '', position: '' });
    setMessage('Staff member added successfully.');
  };

  const handleDeleteStaff = (index) => {
    const updatedStaffList = staffList.filter((_, i) => i !== index);
    setStaffList(updatedStaffList);

    // Save the updated staff list to local storage
    localStorage.setItem('staffList', JSON.stringify(updatedStaffList));
  };

  return (
    <div className="content">
      <h3>Manage Staff</h3>
      <p>Add, view, and delete staff members' information:</p>

      <div className="staff-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newStaff.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newStaff.password}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newStaff.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={newStaff.position}
          onChange={handleInputChange}
        />
        <button onClick={handleAddStaff}>Add Staff</button>
        {message && <p className="message">{message}</p>}
      </div>
      <div className="staff-list">
        <h4>Staff Members</h4>
        <ul>
          {staffList.map((staff, index) => (
            <li key={index}>
              <strong>{staff.name}</strong> - {staff.position}
              <button onClick={() => handleDeleteStaff(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageStaff;
