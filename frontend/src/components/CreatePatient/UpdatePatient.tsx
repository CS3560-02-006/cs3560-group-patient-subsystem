import React, { useState, useEffect } from "react";
import { Patient } from "../../types/Patient";
import { UserDetails } from "../../types/UserDetails";
import { getAuthHeaders } from "../../utils/api";
import "./patient.css";
import { useNavigate } from "react-router-dom";

// Define component properties
interface Props {
  userDetails: UserDetails;
}

// Create UpdatePatient component with the defined properties
const UpdatePatient: React.FC<Props> = ({ userDetails }) => {
  // Declare component state variables
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const areInputsDisabled =
    userDetails.userType === "clerk" && selectedPatientId === 0;
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

  // Fetch patients from the backend API and update the state
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("/api/patient/", {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const responseData = await response.json();
        setPatients(responseData);

        // Update the patient state if the user is a patient
        if (userDetails.userType === "patient") {
          const patientData = responseData.find(
            (p: Patient) =>
              p.patientID.toLocaleString() === userDetails.patientID
          );
          if (patientData) {
            setPatient(patientData);
          }
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [userDetails]);

  // Update the patient state when form inputs change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatient((prevState: Patient) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Update the dateOfBirth state when the date input changes
  const handleDateOfBirthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setPatient((prevState: Patient) => ({
      ...prevState,
      dateOfBirth: value,
    }));
  };

  // Update the patient address state when address inputs change
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

  // Update the selected patient and patient state when a patient is selected
  const handlePatientSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedPatientId(selectedId);

    const selectedPatient = patients.find(
      (patient) => patient.patientID === selectedId
    );
    if (selectedPatient) {
      setPatient(selectedPatient);
    }
  };

  // Submit the updated patient data to the backend API when the form is submitted
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(patient);
      const response = await fetch(`/api/patient/${patient.patientID}/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(patient),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      navigate("/");
    } catch (error) {
      setError("Error while submitting patient record:");
      console.error("Error while submitting patient record:", error);
    }
  };

  // Delete the selected patient record from the backend
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/patient/${patient.patientID}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      navigate("/");
    } catch (error) {
      setError("Error while deleting patient record");
      console.error("Error while deleting patient record:", error);
    }
  };

  // Render the form with patient details
  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="header">Update Patient Record</div>
        {userDetails.userType === "clerk" && (
          <label>
            Select Patient:
            <select value={selectedPatientId} onChange={handlePatientSelection}>
              <option value="0">Choose a patient</option>
              {patients.map((patient) => (
                <option key={patient.patientID} value={patient.patientID}>
                  {patient.patientID} - {patient.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            disabled={areInputsDisabled}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={patient.dateOfBirth}
            onChange={handleDateOfBirthChange}
            disabled={areInputsDisabled}
          />
        </label>
        <label>
          Insurance Provider:
          <input
            type="text"
            name="insuranceProvider"
            value={patient.insuranceProvider}
            onChange={handleChange}
            disabled={areInputsDisabled}
          />
        </label>
        <label>
          Policy Number:
          <input
            type="text"
            name="policyNumber"
            value={patient.policyNumber}
            onChange={handleChange}
            disabled={areInputsDisabled}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={patient.phoneNumber}
            onChange={handleChange}
            disabled={areInputsDisabled}
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
            disabled={areInputsDisabled}
          />
        </label>
        <label>
          Apt:
          <input
            type="text"
            name="apt"
            value={patient.address.apt}
            onChange={handleAddressChange}
            disabled={areInputsDisabled}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={patient.address.city}
            onChange={handleAddressChange}
            disabled={areInputsDisabled}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={patient.address.state}
            onChange={handleAddressChange}
            disabled={areInputsDisabled}
          />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={patient.address.zipcode}
            onChange={handleAddressChange}
            disabled={areInputsDisabled}
          />
        </label>
        <div className="divider"></div>

        <div className="container">
          <button
            type="submit"
            className="submit-button"
            disabled={areInputsDisabled}
          >
            Submit
          </button>
          <button type="button" className="cancel-button" onClick={() => navigate('/')}>
            Cancel
          </button>
          {userDetails.userType === "clerk" && (
            <button
              type="button"
              className="delete-patient-button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={selectedPatientId === 0}
            >
              Delete Patient Record
            </button>
          )}
        </div>
      </form>
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-box">
            <p>Are you sure you want to delete this patient record?</p>
            <div className="confirm-delete-buttons">
              <button type="button" onClick={handleDelete}>
                Yes, delete the record
              </button>
              <button type="button" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePatient;
