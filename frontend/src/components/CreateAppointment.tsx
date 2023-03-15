import React, { FormEvent, FormEventHandler, useRef } from 'react'

//UI functionality for creating a new appointment
const CreateAppointment = () => {
    const patientRef = useRef(null)
    const doctorRef = useRef(null)
    const time = useRef(null)
    const descRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        let response = await fetch(`http://127.0.0.1:8000/appointment/`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                description : descRef?.current?.value || "nothing"
            })
        })
        console.log(await response.json())
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label></label>
                <input placeholder='description' ref={descRef}></input>
            </fieldset>
        </form>
    </div>
  )
}

export default CreateAppointment