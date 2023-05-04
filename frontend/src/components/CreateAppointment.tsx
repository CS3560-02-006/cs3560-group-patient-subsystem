import React, { useState, useEffect, useContext } from 'react'
import { Doctor } from '../types/Doctor';
import { Appointment } from '../types/Appointment';
import { ErrorResponse, fetchPatients, submitCreateAppointment } from '../utils/api';
import AppointmentSelector from './AppointmentSelector';
import AppointmentMiniCard from './AppointmentMiniCard';
import { fetchAvailableDoctors } from '../utils/api';
import UserContext from '../authentication/context';
import { Patient } from '../types/Patient';
import PatientCard from './PatientCard';
//UI functionality for creating a new appointment

const CreateAppointment = () => {
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const [patientList, setPatientList] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null)
    const [description, setDescription] = useState<string>("");
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [submitOK, setSubmitOK] = useState<boolean>(false);
    const context = useContext(UserContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!context?.state.userDetails) {
          console.error("no context");
          return;
        }

        const { userType, patientID } = context?.state.userDetails;
        if (userType === "clerk" && !selectedPatient) {
          setError({error: "Please select a patient."})
          return;
        }

        if (!activeDoctor) {
          setError({error: "Please select a doctor"})
          return
        }

        if (!selectedAppointment) {
          setError({error: "Please select an appointment"})
          return;
        }

        const resp = await submitCreateAppointment(selectedAppointment.appointmentID, {
          description: description,
          patientID: userType === "patient" ? parseInt(patientID, 10) : (selectedPatient as Patient).patientID,
          doctorID: (activeDoctor as Doctor).doctorID,
          appointmentID: (selectedAppointment as Appointment).appointmentID,
          status: "scheduled",
        })

        if (!resp) {
          setError({error: "submit failed"});
        } else {
          setSubmitOK(true);
        }
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
      let interval: NodeJS.Timeout;
      if (submitOK) {
        interval = setTimeout(() => setSubmitOK(false), 5000)
      }
      return () => clearTimeout(interval);
    }, [submitOK])
    
    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (error) {
        interval = setTimeout(() => setError(null), 5000)
      }
      return () => clearTimeout(interval);
    }, [error])

    useEffect(() => {
        const doFetch = async () => {
            setDoctorList([]);
            setPatientList([]);

            
            if (!ignore) {
              try {
              const pDoctors = await fetchAvailableDoctors();
              
              if (context?.state.userDetails.userType === "clerk") {
                const pPatients = await fetchPatients();
                setPatientList(pPatients)
              }
                setDoctorList(pDoctors);
                setActiveDoctor(pDoctors[0]);
              } catch (e) {
                if (e instanceof Error) {
                  setError({error: e.message})
                }
              }
            }
        }

        let ignore = false;
        doFetch();
        return () => {
            ignore = true;
        }
    }, [context?.state.userDetails.userType])

    if (error) {
      return <div>{error.error}</div>
    }
    const selectedDoctorComponent = selectedAppointment ? (
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="mb-2">Selected appointment:</p>
          <AppointmentMiniCard appointment={selectedAppointment as Appointment} />
        </div>
      ) : <></>;

    const appointmentField = activeDoctor ? (
        <>
            <fieldset className="bg-white rounded-lg p-4 mb-4">
            <label className="block mb-2">Select Appointment:</label>
            <AppointmentSelector
                appointments={(activeDoctor as Doctor).appointments.filter(app => app.status === "available")}
                setSelectedAppointment={setSelectedAppointment}
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
        </> ) : null


      const selectPatientField = (
        <div>
          <div>Select a patient:</div>
          <div className="flex flex-wrap gap-px bg-white rounded-md">
            {patientList.map(patient => <PatientCard key={patient.patientID} patient={patient} setSelectedPatient={setSelectedPatient}/>)}
          </div>
        </div>
      )

      const selectPatientComponent = selectedPatient ? (
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="mb-2">Selected patient:</p>
          <PatientCard patient={selectedPatient} setSelectedPatient={setSelectedPatient} />
        </div>
      ) : <></>

      return (
        <div className="min-h-screen w-screen flex flex-col items-center bg-gray-100">
        <div className="w-9/12 flex justify-center py-12">
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2 w-80 items-stretch bg-gray-200 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Create Appointment</h2>
            <fieldset className='bg-white rounded-lg p-4 mb-4'>
              <label className="block mb-2">Doctor:</label>
              <select value={activeDoctor?.name || ""} onChange={handleSetDoctor} className="rounded-md border bg-gray">
                {doctorList?.map(doctor => (<option key={doctor.doctorID}> {doctor.name} </option>)) || "No doctors available..."}
              </select>
            </fieldset>
            {activeDoctor && appointmentField}
            {patientList.length > 0 && selectPatientField}
            {selectedDoctorComponent}
            {selectPatientComponent}
          <div className="flex justify-between">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white" type='submit'>Submit</button>
            <button className="px-4 py-2 rounded-lg bg-red-600 text-white" type='button' onClick={() => {}}>Cancel</button>
          </div>
          {submitOK && "Succesfully updated"}
          </form>
          </div>
        </div>
      );
}

export default CreateAppointment