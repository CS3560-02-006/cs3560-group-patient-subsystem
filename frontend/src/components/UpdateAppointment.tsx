import React, { useState, useEffect } from 'react'
import { Doctor } from '../types/Doctor';
import { Appointment } from '../types/Appointment';
import AppointmentSelector from './AppointmentSelector';
import AppointmentMiniCard from './AppointmentMiniCard';
import { fetchAvailableDoctors,getAuthHeaders } from '../utils/api';
import { useNavigate } from 'react-router-dom';

//UI functionality for updating appointment information

interface UpdateAppointmentProp {
  appointment: Appointment;
};
const UpdateAppointment : React.FC<UpdateAppointmentProp>= ({appointment}) => {
  
  const [doctorList,setDoctorList]= useState<Doctor[]> ([]);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment|null>(appointment);
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(appointment.doctor);
  const [description, setDescription] = useState<string>(appointment.description||'');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();


  const patientID=appointment.id;
  
  const handleUpdateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('not implemented');
    appointment.status="available";
    //want to set to 0 or null, but the type interface has the field as a num
    appointment.id=-999;

    try { 
      // const response = await fetch(`http://:8000/appointment/${appointment?.appointmentID}`, {
      //     method: "PATCH",
      //     headers: getAuthheaders(),
      //     body: JSON.stringify({
      //         appointment
      //     })
      // });
      //if (!response.ok) {
      //  throw new Error(`HTTP error: ${response.status}`);
      //}
    } catch(error) { 
      setError('Error when freeing up original to available status');
      console.error('Error when freeing up original to available status :', error);
    }
    
    // update new currently desired appointment
    if(currentAppointment) { 
      currentAppointment.id=patientID;
      currentAppointment.status="scheduled";
      try { 
        // const response = await fetch(`http://:8000/appointment/${selectedAppointment?.appointmentID}`, {
        //     method: "PATCH",
        //     headers: getAuthheaders(),
        //     body: JSON.stringify({
        //         currentAppointment
        //     })
        // });
        //if (!response.ok) {
        //  throw new Error(`HTTP error: ${response.status}`);
        //}
        navigate("/")
      } catch (error){ 
        setError('Error when updating desired appointment to scheduled status');
        console.error('Error when updating desired appointment to scheduled status :', error);
      }
    }    
  };
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
  useEffect(() => {
    const doFetch = async () => {
      setDoctorList([]);
      const result = await fetchAvailableDoctors();
      if (!ignore) {
        console.log(result);
        setDoctorList(result);
        setActiveDoctor(result.find(result[0]));
      }
    };
    let ignore = false;
    doFetch();
    return () => {
      ignore = true;
    }
  }, [])

  const selectedComponent = currentAppointment ? (
    <div className="bg-white rounded-lg p-4 mb-4">
      <p className="mb-2">Selected appointment:</p>
      <AppointmentMiniCard appointment={currentAppointment as Appointment} />
    </div>
  ) : <></>;

  const appointmentField = activeDoctor ? (
    <>
        <fieldset className="bg-white rounded-lg p-4 mb-4">
        <label className="block mb-2">Select Appointment:</label>
        <AppointmentSelector
            appointments={(activeDoctor as Doctor).appointments.filter(app => app.status === "available")}
            setSelectedAppointment={setCurrentAppointment}
        />
        </fieldset>
        <fieldset className="bg-white rounded-lg p-4 mb-4">
            <label className="block mb-2">Description: </label>
            <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                placeholder='description'
                className="rounded-md border p-2 w-full resize-none bg-gray-200"
                required>
            </textarea>
        </fieldset>
      {selectedComponent}
      <div className="flex justify-between">
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white" type='submit'>Update</button>
        <button className="px-4 py-2 rounded-lg bg-red-600 text-white" type='button' onClick={() => {}}>Cancel</button>
      </div>
    </> ) : null
  
  return (
    <div className="min-h-screen flex flex-col justify-start bg-gray-100">
    <div className="w-full flex justify-center py-12">
      <form onSubmit={handleUpdateAppointment} className="flex flex-col gap-2 w-80 items-stretch bg-gray-200 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Update Appointment</h2>
        <fieldset className='bg-white rounded-lg p-4 mb-4'>
          <label className="block mb-2">Doctor:</label>
          <select value={activeDoctor?.name || ""} onChange={handleSetDoctor} className="rounded-md border bg-gray">
            {doctorList?.map(doctor => (<option key={doctor.doctorID}> {doctor.name} </option>)) || "No doctors available..."}
          </select>
        </fieldset>
        <fieldset className='bg-white rounded-lg p-4 mb-4'>
  </fieldset>
        {activeDoctor && appointmentField}
      </form>
      </div>
    </div>
  );
  
}

export default UpdateAppointment
