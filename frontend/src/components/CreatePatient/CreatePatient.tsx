import React, { useState } from "react";
import { Patient } from "../../types/Patient";
import { getAuthHeaders } from "../../utils/api";
import "./patient.css";
import { useNavigate } from "react-router-dom";

// CreatePatient component
const CreatePatient = () => {
  // Initialize state for error message and patient object
  const [error, setError] = useState<string>("");
  const [patient, setPatient] = useState<Patient>({
    patientID: 0,
    name: "",
    dateOfBirth: new Date().toISOString().substr(0, 10),
    phoneNumber: "",
    insuranceProvider: "",
    policyNumber: "",
    address: {
      street: "",
      apt: "",
      city: "",
      state: "",
      zipcode: "",
    },
  });
  const navigate = useNavigate();

  // Handle changes to input fields for patient details
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatient((prevState: Patient) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes to input field for patient's date of birth
  const handleDateOfBirthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setPatient((prevState: Patient) => ({
      ...prevState,
      dateOfBirth: value,
    }));
  };

  // Handle changes to input fields for patient's address
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatient((prevState: Patient) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  // Handle form submission to create new patient record
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !patient.name ||
      !patient.phoneNumber ||
      !patient.insuranceProvider ||
      !patient.dateOfBirth ||
      !patient.policyNumber ||
      !patient.address.street ||
      !patient.address.city ||
      !patient.address.state ||
      !patient.address.zipcode
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    // Make backend API call to create new patient record
    try {
      const response = await fetch("/api/patient/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(patient),
      });

      // Check if the response is not ok and throw an error if necessary
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      // Process the response and navigate to the root page
      const responseData = await response.json();
      alert("Patient record created successfully!");
      navigate("/");
    } catch (error) {
      // Set error message and log error to console
      setError("Error while submitting patient record:");
      console.error("Error while submitting patient record:", error);
      alert("Error while submitting patient record. Please try again.");
    }
  };

  // Render the form to collect patient details and submit the new patient record
  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="header">Create Patient Record</div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={patient.dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </label>
        <label>
          Insurance Provider:
          <input
            type="text"
            name="insuranceProvider"
            value={patient.insuranceProvider}
            onChange={handleChange}
          />
        </label>
        <label>
          Policy Number:
          <input
            type="text"
            name="policyNumber"
            value={patient.policyNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={patient.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <div className="divider"></div>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={patient.address.street}
            onChange={handleAddressChange}
          />
        </label>
        <label>
          Apt:
          <input
            type="text"
            name="apt"
            value={patient.address.apt}
            onChange={handleAddressChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={patient.address.city}
            onChange={handleAddressChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={patient.address.state}
            onChange={handleAddressChange}
          />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={patient.address.zipcode}
            onChange={handleAddressChange}
          />
        </label>
        <div className="divider"></div>
        <div className="container">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" className="cancel-button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePatient;
