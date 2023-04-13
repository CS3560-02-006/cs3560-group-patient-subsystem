import {useRef, useState, useEffect } from 'react'
import {getDay} from 'date-fns'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

//UI functionality for creating a new appointment
const CreateAppointment = () => {
    const [date, setDate] = useState(null)
    const [doctor, setDoctor] = useState("")
    const descRef = useRef(null)


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(JSON.stringify({
            date : date,
            description: descRef,
            doctor: doctor,
            status: "unconfirmed"
            // patientID: <-- Depends on user identification
        }))
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
                    <select value={doctor} onChange={(e)=>setDoctor(e.target.value)}>
                        <option></option>
                        <option value="Doc1">Doc1</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label>Appointment Time </label>
                    <DatePicker 
                        selected={date}
                        onChange={(date) => setDate(date)}
                        showTimeSelect
                        filterDate={dayFilter}
                        filterTime={timeFilter}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        />
                </fieldset>
                <fieldset>
                    <label>Description: </label>
                    <input placeholder='description' ref={descRef} required></input>
                </fieldset>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateAppointment