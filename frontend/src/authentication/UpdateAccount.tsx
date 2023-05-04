import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import {getAuthHeaders} from '../utils/api'
import { UserDetails } from '../types/UserDetails';
import './auth.css';

interface Props {
    onUpdate: (token: string, userID: string, email: string, userType: string, patientID: string) => void;
    userDetails: UserDetails;
    onDelete: () => void
  }


const UpdateAccount: React.FC<Props>  = ({onUpdate, userDetails, onDelete}) => {
  const [patientID, setPatientID] = useState(userDetails.patientID); 
  const [email, setEmail] = useState(userDetails.email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

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
    
    const response = await fetch(`/api/user/${userDetails.userID}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
      
          if (response.ok) {
            const data = await response.json();
            onUpdate(data.token, data.userID, data.email, data.userType, data.patientID);
            navigate("/")
          } else {
            setError('Invalid email or password');
          }
    } else {
      setError('Error could not update account');
    }
  };

  const handleDeleteAccount = async () => {
    const response = await fetch(`/api/user/${userDetails.userID}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      onDelete()
      navigate('/');
    } else {
      console.log(response)
      setError('Error, could not delete account');
    }
  };

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