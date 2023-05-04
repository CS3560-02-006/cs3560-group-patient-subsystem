import React, { useState, useEffect } from "react";
import { UserDetails } from "../../types/UserDetails";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../../utils/api";
import { month_names } from "../../types/MonthGroup";

interface Appointment {
  appointmentID: string;
  doctorID: string;
  doctorName: string;
  patientID: number;
  patientName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface Props {
  userDetails: UserDetails;
}

const Home: React.FC<Props> = ({ userDetails }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/appointment", {
      headers: getAuthHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (userDetails.userType === "patient") {
          const filteredData = data.filter(
            (appointment: Appointment) =>
              appointment.patientID === parseInt(userDetails.patientID, 10)
          );
          setAppointments(filteredData);
        } else if (userDetails.userType === "clerk") {
          const filteredData = data.filter(
            (appointment: Appointment) => appointment.status !== "available"
          );
          setAppointments(filteredData);
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [userDetails]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = month_names[date.getMonth() + 1];
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const handleUpdate = (appointment: Appointment) => {
    navigate("/updateAppointment", { state: { appointment } });
  };

  const handleCancel = async (appointmentID: string) => {
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
              <td>{appointment.startTime}</td>
              <td>{appointment.endTime}</td>
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
    </div>
  );
};
export default Home;
