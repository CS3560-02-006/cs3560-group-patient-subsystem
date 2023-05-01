import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { getAuthHeaders } from '../../utils/api';
import { Patient } from '../../types/Patient';
import './appointment.css';
import { UserDetails } from '../../types/UserDetails';

interface Doctor {
    doctorID: number,
    name: string,
    phoneNumber: string,
    emailAddress: string,
    speciality: string,
    appointments: Appointment[],
};

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


const CreateAppointment: React.FC<Props> = ({userDetails})=> {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableAppointments, setAvailableAppointments] = useState<Appointment[]>([]);
  const [firstMount, setFirstMount] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currApt = location.state.appointment

  // Fetch doctors and patients
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctor/', {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const responseData = await response.json();
        setDoctors(responseData);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchPatients = async () => {
        try {
          const response = await fetch('/api/patient/', {
            headers: getAuthHeaders(),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
            
          }
          const responseData = await response.json();
          setPatients(responseData);
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };

    fetchDoctors();
    fetchPatients();

  }, []);

  useEffect(() => {
    if (userDetails.userType === 'patient' && patients.length > 0) {
      const patientFound = patients.find((p:Patient) => p.patientID === parseInt(userDetails.patientID));
      if (patientFound) {
        setPatient(patientFound);
      }
    }
    else if(currApt.patientID){
        const patientFound = patients.find((p:Patient) => p.patientID === parseInt(currApt.patientID));
        if (patientFound) {
          setPatient(patientFound);
        }
    }
  }, [patients]);

    useEffect(() => {
        if (currApt) {
        const doctorID = currApt.doctorID;
        const foundDoctor = doctors.find((doc: Doctor) => doc.doctorID === parseInt(doctorID, 10));
        if (foundDoctor) {
            setSelectedDoctor(foundDoctor);
        }
        }
    }, [currApt, doctors]);


    useEffect(() => {
        if (selectedDoctor) {
        setAvailableAppointments(selectedDoctor.appointments.filter( (appt: Appointment) => appt.status === 'available'));
        } else {
        setAvailableAppointments([]);
        }
    }, [selectedDoctor]);
    
    useEffect(() => {
        console.log(firstMount)
        if (currApt && selectedDoctor) { 
        const foundAppointment = selectedDoctor.appointments.find((appt: Appointment) => appt.appointmentID === currApt.appointmentID);
        if (foundAppointment && firstMount) {
            console.log("running it")
            setSelectedDate(foundAppointment.date);
            setSelectedTime(foundAppointment.startTime);
            setFirstMount(false)
        }
        }
    }, [currApt, availableAppointments]);



  const handleDoctorChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const doctorID = parseInt(event.target.value);
    const doctor = doctors.find((doc:Doctor) => doc.doctorID === doctorID);

    if (doctor) {
        setSelectedDoctor(doctor);
        setAvailableAppointments(doctor.appointments.filter( (appt: Appointment) => appt.status === 'available'));
        setSelectedDate(''); 
        setSelectedTime('');
    } else {
      setSelectedDoctor(null);
      setAvailableAppointments([]);
      setSelectedDate(''); 
      setSelectedTime('');
    }

  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
    setSelectedTime('');
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = async () => {
    if (!patient || !selectedDoctor || !selectedDate || !selectedTime) {
        alert('Please fill in all fields');
        return;
      }
    const selectedAppointment = availableAppointments.find(
        (appt:Appointment) => appt.date === selectedDate && appt.startTime === selectedTime
      );
  
      if (!selectedAppointment) {
        alert('Selected appointment not found');
        return;
      }
    try {
        const resp = await fetch(`/api/appointment/${currApt.appointmentID}/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({
              patientID: null,
              status: "available",
            }),
          });
      
          if (!resp.ok) {
            throw new Error(`HTTP error: ${resp.status}`);
          }

        const response = await fetch(`/api/appointment/${selectedAppointment.appointmentID}/`, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            patientID: patient.patientID,
            status: "scheduled",
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
    
        alert('Appointment created successfully');
        navigate('/');
      } catch (error) {
        console.error('Error creating appointment:', error);
        alert('Error creating appointment');
      }
  }

  return (
    <div className='container'>
      <h2>Update Appointment</h2>
      <div className='formGroup'>
      {userDetails.userType === 'clerk' && (
            <label>
            Patient:
            <select
                value={patient?.patientID || ''}
                onChange={(e) => setPatient(patients.find((p) => p.patientID === parseInt(e.target.value)) || null)}
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
          <select value={selectedDoctor?.doctorID || ''} onChange={handleDoctorChange}>
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
                {Array.from(new Set(availableAppointments.map((appointment) => appointment.date))).map((date) => {
                const [year, month, day] = date.split('-');
                return (
                    <option key={date} value={date}>
                    {`${month}-${day}`}
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
                  <option key={appointment.startTime} value={appointment.startTime}>
                    {appointment.startTime} - {appointment.endTime}
                  </option>
                ))}
            </select>
          </label>
        </>
      )}
      <button onClick={handleSubmit}>Update Appointment</button>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default CreateAppointment;