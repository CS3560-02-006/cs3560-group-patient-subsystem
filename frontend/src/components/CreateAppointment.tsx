import React, { useState, useEffect } from 'react'
import { Doctor } from '../types/Doctor';
import { Appointment } from '../types/Appointment';
import AppointmentSelector from './AppointmentSelector';
import AppointmentMiniCard from './AppointmentMiniCard';
import { fetchAvailableDoctors } from '../utils/api';
//UI functionality for creating a new appointment
const CreateAppointment = () => {
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null)
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(
            "not implemented"
        );
        // let response = await fetch(`http://:8000/appointment/`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     },
        //     body: JSON.stringify({
        //     })
        // })
    }

    const handleSetDoctor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!doctorList || doctorList.length === 0) {
            return;
        }

        const name = e.target.value;

        if (name === "") {
            return;
        }

        const doctor = doctorList?.find(d => d.name == name);

        if (doctor) {
            setActiveDoctor(doctor);
            setSelectedAppointment(null);
        } else {
            console.error("unknown doctor:" + name);
        }
    };

    // need intervals for dates

    //Resets Date If Doctor is Changed
    useEffect(()=>{
        setSelectedAppointment(null);
    }, [activeDoctor])
    
    useEffect(() => {
        const doFetch = async () => {
            setDoctorList([]);
            const result = await fetchAvailableDoctors();
            if (!ignore) {
                setDoctorList(result)
            }
        }

        let ignore = false;
        doFetch();
        return () => {
            ignore = true;
        }
    }, [])

    const appointmentField = activeDoctor ? (
        <>
            <fieldset>
                <label>Appointment Time</label>
                <AppointmentSelector 
                    appointments={(activeDoctor as Doctor).appointments.filter(app => app.status === "AVAILABLE")}
                    setSelectedAppointment={setSelectedAppointment}
                />
            </fieldset>
            <fieldset>
                <label>Description: </label>
                <input type="text"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    placeholder='description'
                    required>
                </input>
            </fieldset>
            <div>
                <p>Selected appointment:</p>
                <AppointmentMiniCard appointment={selectedAppointment as Appointment} />
            </div>
            <button type='submit'>Submit</button>
        </> ) : null

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <select value={activeDoctor?.name || ""} onChange={handleSetDoctor}>
                        <option value="" disabled selected>Select your option</option>
                        {doctorList?.map(doctor => <option key={doctor.id}>{doctor.name}</option>) || "No doctors available..."}
                    </select>
                </fieldset>
                {activeDoctor && appointmentField}
            </form>
        </div>
    )
}

export default CreateAppointment