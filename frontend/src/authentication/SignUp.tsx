import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import './auth.css';

// Define the interface for SignUp component's Props
interface Props {
    onSignUp: (token: string, userID: string, email: string, userType: string, patientID: string) => void;
  }

// SignUp component
const SignUp: React.FC<Props> = ({ onSignUp }) => {
  // State variables for managing user input and component state
  const [patientID, setPatientID] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission for user sign up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate if the password and passwordConfirmation match
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    // Make POST request to create a new user
    const response = await fetch('/api/user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientID, email, password, userType:"patient" }), 
    });

    // Handle the response of the POST request
    if (response.ok) {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
      
          if (response.ok) {
            const data = await response.json();
            onSignUp(data.token, data.userID, data.email, data.userType, data.patientID);
            alert('Account created successfully')
            navigate("/")
          } else {
            setError('Invalid email or password');
          }
    } else {
      setError('An error occurred during sign up');
    }
  };

  // Render the SignUp component
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