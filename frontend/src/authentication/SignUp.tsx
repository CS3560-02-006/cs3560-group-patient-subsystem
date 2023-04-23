import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import './auth.css';

interface Props {
    onSignUp: (token: string, userID: string, email: string, userType: string, patientID: string) => void;
  }
const SignUp: React.FC<Props> = ({ onSignUp }) => {
  const [patientID, setPatientID] = useState(''); // Add a state for userID
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('/api/user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientID, email, password, userType:"patient" }), // Add userID to the request body
    });

    if (response.ok) {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
      
          if (response.ok) {
            const data = await response.json();
            onSignUp(data.token, data.userID, data.email, data.userType, data.patientID);
            navigate("/")
          } else {
            setError('Invalid email or password');
          }
    } else {
      setError('An error occurred during sign up');
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="userID">Patient ID:</label>
        <input
          type="text"
          id="userID"
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
        />
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
        <label htmlFor="passwordConfirmation">Confirm Password:</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="switch-auth">
        <span>Already have an account? </span>
        <Link to="/">Log in</Link>
      </div>
    </div>
  );
};
 
export default SignUp;