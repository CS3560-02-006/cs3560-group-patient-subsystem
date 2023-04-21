import React, {useEffect} from 'react'
import { fetchAvailableDoctors } from '../utils/api';

//UI functionality for creating a patient record
const CreatePatient = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }
  useEffect(()=>{
    const doFetch = async () => {
      const result = await fetchAvailableDoctors();
      console.log(result)
    }
    doFetch();
},[]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
            <label>Full Name: </label>
            <input placeholder='description' required></input>
        </fieldset>
        <fieldset>
            <label>Date of Birth: </label>
            <input placeholder='description' required></input>
        </fieldset>
        <fieldset>
            <label>Phone Number: </label>
            <input placeholder='description' required></input>
        </fieldset>
        <fieldset>
            <select>
              <option></option>
              <option>Provider1</option>  
              <option>Provider2</option>  
            </select>
        </fieldset>
        <fieldset>
            <label>Policy Number: </label>
            <input placeholder='description' required></input>
        </fieldset>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreatePatient