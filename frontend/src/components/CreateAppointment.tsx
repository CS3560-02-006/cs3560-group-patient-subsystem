import React, { useState, useEffect } from 'react'
import { Doctor } from '../types/Doctor';
import { Appointment } from '../types/Appointment';
import AppointmentSelector from './AppointmentSelector';
//UI functionality for creating a new appointment
const CreateAppointment = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [doctorList, setDoctorList] = useState<Doctor[] | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null)
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log({
            date : date,
            description: description,
            doctor: activeDoctor,
            status: "unconfirmed"
            // patientID: <-- Depends on user identification
        });
        // let response = await fetch(`http://127.0.0.1:8000/appointment/`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     },
        //     body: JSON.stringify({
        //         // description : descRef?.current?.value || "nothing"
        //     })
        // })
        // console.log(await response.json())
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
        setDate(null)
    }, [activeDoctor])

    const appointmentField = (
        <>
            <fieldset>
                <label>Appointment Time</label>
                <AppointmentSelector 
                    appointments={(activeDoctor as Doctor).appointments}
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
            <button type='submit'>Submit</button>
        </>
    );

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <select value={activeDoctor?.name || ""} onChange={handleSetDoctor}>
                        {doctorList?.map(doctor => <option key={doctor.id}>{doctor.name}</option>) || "No doctors available..."}
                    </select>
                </fieldset>
                {activeDoctor && appointmentField}
            </form>
        </div>
    )
}

export default CreateAppointment