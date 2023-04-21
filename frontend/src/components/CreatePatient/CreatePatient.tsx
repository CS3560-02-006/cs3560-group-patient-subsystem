import React, { useState } from 'react';
import {Patient} from '../../types/Patient';
import {Address} from '../../types/Address';
import './patient.css';

const CreatePatient = () => {
  const [patient, setPatient] = useState<Patient>({
    id: 0,
    name: '',
    dateOfBirth: new Date(),
    phoneNumber: '',
    insuranceProvider: '',
    policyNumber: '',
    address: {
      street: '',
      apt: '',
      city: '',
      state: '',
      zipcode: ''
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatient((prevState:Patient)  => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatient((prevState:Patient) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData);
      // Do something with the responseData, e.g., show a success message or redirect the user
    } catch (error) {
      console.error('Error while submitting patient record:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='header'>Create Patient Record</div>
        <label>
          Name:
          <input type="text" name="name" value={patient.name} onChange={handleChange} />
        </label>
        <label>
          Date of Birth:
          <input type="date" name="dateOfBirth" value={patient.dateOfBirth.toLocaleDateString('en-CA')} onChange={handleChange} />
        </label>
        <label>
          Insurance Provider:
          <input type="text" name="insuranceProvider" value={patient.insuranceProvider} onChange={handleChange} />
        </label>
        <label>
          Policy Number:
          <input type="text" name="policyNumber" value={patient.policyNumber} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={patient.phoneNumber} onChange={handleChange} />
        </label>
        <div className='divider'></div>
        <label>
          Street:
          <input type="text" name="street" value={patient.address.street} onChange={handleAddressChange} />
        </label>
        <label>
          Apt:
          <input type="text" name="apt" value={patient.address.apt} onChange={handleAddressChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={patient.address.city} onChange={handleAddressChange} />
        </label>
        <label>
          State:
          <input type="text" name="state" value={patient.address.state} onChange={handleAddressChange} />
        </label>
        <label>
          Zipcode:
          <input type="text" name="zipcode" value={patient.address.zipcode} onChange={handleAddressChange} />
        </label>
        <div className='divider'></div>
        <div className='container'>
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className='cancel-button' onClick={() => {}}>Cancel</button>
        </div>
      </form>
    </div>

  );
};

export default CreatePatient;