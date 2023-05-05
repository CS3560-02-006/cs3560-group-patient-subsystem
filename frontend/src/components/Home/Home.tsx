import React, { useState, useEffect } from "react";
import { UserDetails } from "../../types/UserDetails";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../utils/api";
import { month_names } from "../../types/MonthGroup";
import UpdateAppointment from "../Appointment/UpdateAppointment";
import Modal from "../../layout/Modal";
import {Appointment} from '../../types/AltApp'

interface Props {
  userDetails: UserDetails;
}

const Home: React.FC<Props> = ({ userDetails }) => {
  // Initialize states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const navigate = useNavigate();

  // Fetch appointments when the component mounts
  useEffect(() => {
    fetch("/api/appointment", {
      headers: getAuthHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        // Filter data based on user type
        if (userDetails.userType === "patient") {
          const filteredData = data.filter(
            (appointment: Appointment) =>
              appointment.patientID === parseInt(userDetails.patientID, 10) && appointment.status == "scheduled"
          );
          setAppointments(filteredData);
        } else if (userDetails.userType === "clerk") {
          const filteredData = data.filter(
            (appointment: Appointment) => appointment.status == "scheduled"
          );
          setAppointments(filteredData);
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [userDetails]);

  // Format date string to display month and day
  const formatDate = (dateStr: string) => {
    const month = month_names[parseInt(dateStr.split('-')[1])];
    const day = dateStr.split('-')[2];

    return `${month} ${day}`;
  };

  const formatTime = (timeStr: string )=>{
    let time = timeStr.split(':')

    return `${time[0]}:${time[1]}`
  }

  // Open update appointment modal
  const handleUpdate = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowUpdateModal(true);
  };

  // Close update appointment modal
  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  // Cancel appointment
  const handleCancel = async (appointmentID: number) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const response = await fetch(`/api/appointment/${appointmentID}/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          patientID: null,
          status: "available",
          description: "",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      // Remove canceled appointment from the appointments list
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.appointmentID !== appointmentID
        )
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Error deleting appointment");
    }
  };

  // Render the component
  return (
    <div>
      <h1>Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Doctor</th>
            {userDetails.userType === "clerk" && <th>Patient</th>}
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.doctorName}</td>
              {userDetails.userType === "clerk" && (
                <td>{appointment.patientName}</td>
              )}
              <td>{formatDate(appointment.date)}</td>
              <td>{formatTime(appointment.startTime)}</td>
              <td>{formatTime(appointment.endTime)}</td>
              <td>
                <button onClick={() => handleUpdate(appointment)}>
                  Update
                </button>
                <button onClick={() => handleCancel(appointment.appointmentID)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUpdateModal && selectedAppointment && (
        <Modal>
          <UpdateAppointment
            userDetails={userDetails}
            currApt={{
              appointmentID: selectedAppointment.appointmentID,
              doctorID: selectedAppointment.doctorID,
              patientID: selectedAppointment.patientID,
            }}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};
export default Home;
