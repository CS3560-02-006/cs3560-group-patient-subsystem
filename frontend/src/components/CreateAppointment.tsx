import React, { useState, useEffect } from 'react'
//UI functionality for creating a new appointment
const CreateAppointment = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [doctor, setDoctor] = useState<string>("")
    const [description, setDescription] = useState<string>("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log({
            date : date,
            description: description,
            doctor: doctor,
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


    // need intervals for dates

    //Filters Time need to replace hardcode numbers with variables queried from DB
    const timeFilter = (time) => {
        const selectedDate = new Date(time);
        let selectedTime = selectedDate.getHours()*60 + selectedDate.getMinutes()
    
        return (selectedTime < 17*60 && 7*60+30 < selectedTime );
    }

    //Filters Days need to replace hardcoded numbers with variables queried from DB
    const dayFilter = (date) => {
        const day = getDay(date);
        return day !== 1 && day !== 5;
    }

    //Resets Date If Doctor is Changed
    useEffect(()=>{
        setDate(null)
    }, [doctor])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <select value={doctor} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDoctor(e.target.value)}>
                        <option></option>
                        <option value="Doc1">Doc1</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label>Appointment Time </label>
                    <input type="date"></input>
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
            </form>
        </div>
    )
}

export default CreateAppointment