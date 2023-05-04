// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";
import { Patient } from "../../types/Patient";
import "./appointment.css";
import { UserDetails } from "../../types/UserDetails";
import { month_names } from "../../types/MonthGroup";

interface Doctor {
  doctorID: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  speciality: string;
  appointments: Appointment[];
}

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

// Define Props interface for UpdateAppointment component
interface Props {
  userDetails: UserDetails;
  currApt: {
    appointmentID: string;
    doctorID: string;
    patientID: number;
  };
  onClose: () => void;
}

// UpdateAppointment component
const UpdateAppointment: React.FC<Props> = ({ userDetails, currApt, onClose }) => {
  // Declare state variables
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [availableAppointments, setAvailableAppointments] = useState<
    Appointment[]
  >([]);
  const [firstMount, setFirstMount] = useState(true);

  // Fetch doctors and patients
  useEffect(() => {
    // Fetch doctors
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctor/", {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const responseData = await response.json();
        setDoctors(responseData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    // Fetch patients
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
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    // Call fetch functions
    fetchDoctors();
    fetchPatients();
  }, []);

  // Set patient based on userType or currApt.patientID
  useEffect(() => {
    if (userDetails.userType === "patient" && patients.length > 0) {
      const patientFound = patients.find(
        (p: Patient) => p.patientID === parseInt(userDetails.patientID)
      );
      if (patientFound) {
        setPatient(patientFound);
      }
    } else if (currApt.patientID) {
      const patientFound = patients.find(
        (p: Patient) => p.patientID === currApt.patientID
      );
      if (patientFound) {
        setPatient(patientFound);
      }
    }
  }, [patients]);

  // Set selectedDoctor based on currApt
  useEffect(() => {
    if (currApt) {
      const doctorID = currApt.doctorID;
      const foundDoctor = doctors.find(
        (doc: Doctor) => doc.doctorID === parseInt(doctorID, 10)
      );
      if (foundDoctor) {
        setSelectedDoctor(foundDoctor);
      }
    }
  }, [currApt, doctors]);

  // Set available appointments based on selectedDoctor
  useEffect(() => {
    if (selectedDoctor) {
      setAvailableAppointments(
        selectedDoctor.appointments.filter(
          (appt: Appointment) => appt.status === "available"
        )
      );
    } else {
      setAvailableAppointments([]);
    }
  }, [selectedDoctor]);

  // Set selectedDate and selectedTime based on currApt and availableAppointments
  useEffect(() => {
    if (currApt && selectedDoctor) {
      const foundAppointment = selectedDoctor.appointments.find(
        (appt: Appointment) => appt.appointmentID === currApt.appointmentID
      );
      if (foundAppointment && firstMount) {
        setSelectedDate(foundAppointment.date);
        setSelectedTime(foundAppointment.startTime);
        setFirstMount(false);
      }
    }
  }, [currApt, availableAppointments]);

  // Handle doctor selection change
  const handleDoctorChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const doctorID = parseInt(event.target.value);
    const doctor = doctors.find((doc: Doctor) => doc.doctorID === doctorID);

    if (doctor) {
      setSelectedDoctor(doctor);
      setAvailableAppointments(
        doctor.appointments.filter(
          (appt: Appointment) => appt.status === "available"
        )
      );
      setSelectedDate("");
      setSelectedTime("");
    } else {
      setSelectedDoctor(null);
      setAvailableAppointments([]);
      setSelectedDate("");
      setSelectedTime("");
    }
  };

  // Handle date selection change
  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
    setSelectedTime("");
  };

  // Handle time selection change
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!patient || !selectedDoctor || !selectedDate || !selectedTime) {
      alert("Please fill in all fields");
      return;
    }
    const selectedAppointment = availableAppointments.find(
      (appt: Appointment) =>
        appt.date === selectedDate && appt.startTime === selectedTime
    );

    if (!selectedAppointment) {
      alert("Selected appointment not found");
      return;
    }
    try {
      // Free up the existing appointment
      const resp = await fetch(`/api/appointment/${currApt.appointmentID}/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          patientID: null,
          status: "available",
          description: "",
        }),
      });

      if (!resp.ok) {
        throw new Error(`HTTP error: ${resp.status}`);
      }
      console.log(resp.body)

      // Update the selected appointment
      const response = await fetch(
        `/api/appointment/${selectedAppointment.appointmentID}/`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            patientID: patient.patientID,
            status: "scheduled",
            description,
          }),
        }
      );
      console.log(response.body)

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      alert("Appointment updated successfully");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Error creating appointment");
    }
  };

  // Render the UpdateAppointment component
  return (
    <div className="container">
      <h2>Update Appointment</h2>
      <div className="formGroup">
        {userDetails.userType === "clerk" && (
          <label>
            Patient:
            <select
              value={patient?.patientID || ""}
              onChange={(e) =>
                setPatient(
                  patients.find(
                    (p) => p.patientID === parseInt(e.target.value)
                  ) || null
                )
              }
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.patientID} value={patient.patientID}>
                  {patient.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          Doctor:
          <select
            value={selectedDoctor?.doctorID || ""}
            onChange={handleDoctorChange}
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctorID} value={doctor.doctorID}>
                {doctor.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedDoctor && (
        <>
          <label>
            Date:
            <select value={selectedDate} onChange={handleDateChange}>
              <option value="">Select a date</option>
              {Array.from(
                new Set(
                  availableAppointments.map((appointment) => appointment.date)
                )
              ).map((date) => {
                const [year, month, day] = date.split("-");
                return (
                  <option key={date} value={date}>
                    {`${month_names[parseInt(month)]} ${day}`}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Time:
            <select value={selectedTime} onChange={handleTimeChange}>
              <option value="">Select a time</option>
              {availableAppointments
                .filter((appointment) => appointment.date === selectedDate)
                .map((appointment) => (
                  <option
                    key={appointment.startTime}
                    value={appointment.startTime}
                  >
                    {appointment.startTime} - {appointment.endTime}
                  </option>
                ))}
            </select>
          </label>
        </>
      )}
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Update Appointment</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UpdateAppointment;
