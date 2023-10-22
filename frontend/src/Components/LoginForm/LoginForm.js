// LoginForm.js
import React, { useState } from 'react';
import './loginForm.css';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const isAdmin = username === 'admin' && password === '1234';

    if (isAdmin) {
      // Admin login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInStaff', 'admin'); // Save the admin username
      navigate('/dashboard');
    } else {
      // Check credentials against staffList in local storage
      const staffList = JSON.parse(localStorage.getItem('staffList'));
      const user = staffList.find(user => user.username === username && user.password === password);

      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInStaff', username); // Save the staff username
        navigate('/staff-dashboard');
      } else {
        setError('Invalid username or password');
      }
    }
  }

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
