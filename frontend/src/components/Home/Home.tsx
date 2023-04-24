import React, { useState, useEffect } from 'react';
import { UserDetails } from '../../types/UserDetails';
import './Home.css'

interface Appointment {
  appointmentID: string;
  doctorID: string;
  patientID: number;
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

  useEffect(() => {
    fetch('/api/appointment')
      .then((response) => response.json())
      .then((data) => {
        if (userDetails.userType === 'patient') {
          const filteredData = data.filter((appointment: Appointment) => appointment.patientID === parseInt(userDetails.patientID, 10));
          setAppointments(filteredData);
          console.log(filteredData)
        } else if (userDetails.userType === 'clerk') {
          const filteredData = data.filter((appointment: Appointment) => appointment.status !== "available");
          setAppointments(filteredData);
        }
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, [userDetails]);

  return (
    <div>
      <h1>Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.doctorID}</td>
              <td>{appointment.patientID}</td>
              <td>{appointment.date}</td>
              <td>{appointment.startTime}</td>
              <td>{appointment.endTime}</td>
              <td>
                <button>Update</button>
                <button>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Home;
