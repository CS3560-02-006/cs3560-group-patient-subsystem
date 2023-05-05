import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './auth.css'

// Define the interface for Login component's Props
interface Props {
  onLogin: (token: string, userID: string, email: string, userType: string, patientID: string) => void;
}

// Login component
const Login: React.FC<Props> = ({ onLogin }) => {
  // State variables for managing user input and component state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission for user login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Make POST request to the login endpoint with user credentials
    const response = await fetch('/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // Handle the response of the POST request
    if (response.ok) {
      const data = await response.json();
      onLogin(data.token, data.userID, data.email, data.userType, data.patientID);
    } else {
      setError('Invalid email or password');
    }
  }; 

  // Render the Login component
  return (
    <div className="login">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div className="switch-auth">
        <span>Need an account? </span>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;