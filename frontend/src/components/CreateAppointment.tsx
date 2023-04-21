import React, { useState, useEffect } from 'react'
import { Doctor } from '../types/Doctor';
import { Appointment } from '../types/Appointment';
import AppointmentSelector from './AppointmentSelector';
import AppointmentMiniCard from './AppointmentMiniCard';
import { fetchAvailableDoctors } from '../utils/api';
import Padded from '../layout/Padded';
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

        const doctor = doctorList?.find(d => d.name === name);

        if (doctor) {
            setActiveDoctor(doctor);
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
                console.log(result);
                setDoctorList(result);
                setActiveDoctor(result[0]);
            }
        }

        let ignore = false;
        doFetch();
        return () => {
            ignore = true;
        }
    }, [])

    const selectedComponent = selectedAppointment ? (
            <Padded>
                <p>Selected appointment:</p>
                <AppointmentMiniCard appointment={selectedAppointment as Appointment} />
            </Padded>
    ) : <></>

    const appointmentField = activeDoctor ? (
        <>
            <fieldset>
                <Padded>
                    <label>Select Appointment:</label>
                    <AppointmentSelector
                        appointments={(activeDoctor as Doctor).appointments.filter(app => app.status === "available")}
                        setSelectedAppointment={setSelectedAppointment}
                    />
                </Padded>
            </fieldset>
            <fieldset>
                <Padded>
                    <label>Description: </label>
                    <textarea
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        placeholder='description'
                        required>
                    </textarea>
                </Padded>
            </fieldset>
            {selectedComponent}
            <button className="p-2 rounded-lg bg-red-400" type='submit'>Submit</button>
        </> ) : null

    return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80 items-stretch">
                <fieldset className=''>
                    <Padded>
                        Doctor:
                        <select value={activeDoctor?.name || ""} onChange={handleSetDoctor}>
                            {doctorList?.map(doctor => (<option key={doctor.doctorID}> {doctor.name} </option>)) || "No doctors available..."}
                        </select>
                    </Padded>
                </fieldset>
                {activeDoctor && appointmentField}
            </form>
    )
}

export default CreateAppointment