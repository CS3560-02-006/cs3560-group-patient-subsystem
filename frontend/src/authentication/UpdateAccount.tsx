import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import {getAuthHeaders} from '../utils/api'
import { UserDetails } from '../types/UserDetails';
import './auth.css';

// Define the interface for UpdateAccount component's Props
interface Props {
    onUpdate: (token: string, userID: string, email: string, userType: string, patientID: string) => void;
    userDetails: UserDetails;
    onDelete: () => void
  }

// UpdateAccount component
const UpdateAccount: React.FC<Props>  = ({onUpdate, userDetails, onDelete}) => {
  // State variables for managing user input and component state
  const [patientID, setPatientID] = useState(userDetails.patientID); 
  const [email, setEmail] = useState(userDetails.email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission for updating the account
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate if the password and passwordConfirmation match
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    // Define the interface and structure for the request body
    interface RequestBody {
      patientID?: string | null;
      email: string;
      password: string;
      userType: string;
    }
    
    const requestBody: RequestBody = {
      email,
      password,
      userType: userDetails.userType,
    };
    
    if (patientID !== null) {
      requestBody.patientID = patientID;
    }
    
    // Make PATCH request to update the user account
    const response = await fetch(`/api/user/${userDetails.userID}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestBody),
    });

    // Handle the response of the PATCH request
    if (response.ok) {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
      
          if (response.ok) {
            const data = await response.json();
            onUpdate(data.token, data.userID, data.email, data.userType, data.patientID);
            alert('Account Updated Successfully')
            navigate("/")
          } else {
            setError('Invalid email or password');
          }
    } else {
      setError('Error could not update account');
    }
  };

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    const response = await fetch(`/api/user/${userDetails.userID}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    // Handle the response of the DELETE request
    if (response.ok) {
      onDelete()
      alert("Account Deleted Successfully")
      navigate('/');
    } else {
      console.log(response)
      setError('Error, could not delete account');
    }
  };

  // Render the UpdateAccount component
  return (
    <div className="signup">
      <h2>Update Account</h2>
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
        <label htmlFor="passwordConfirmation">Confirm Password:</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type="submit">Update Account</button>
        <button type="button" onClick={() => setShowDeleteConfirm(true)}>Delete Account</button>
      </form>
      <div className="switch-auth">
        <Link to="/">Cancel</Link>
      </div>
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-box">
            <p>Are you sure you want to delete your account?</p>
            <button type="button" onClick={handleDeleteAccount}>Yes, delete my account</button>
            <button type="button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateAccount