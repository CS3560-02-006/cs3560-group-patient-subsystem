import { Patient } from "../../types/Patient"

type PatientCardProps = {
    patient: Patient;
    setSelectedPatient: (patient: Patient) => void;
}

const PatientCard = ({patient, setSelectedPatient}: PatientCardProps) => {
    const { address } = patient;
    return (
        <div onClick={() => setSelectedPatient(patient)} className="cursor-pointer flex flex-col items-center p-1 min-w-max grow bg-gray-200 hover:bg-red-400">
            <div>{patient.name}</div>
            <div className="flex flex-col text-sm items-center">
                <div>{patient.phoneNumber}</div>
                <div>{address.city}, {address.state}</div>
                <div>{patient.insuranceProvider}</div>
            </div>
        </div>
    )
}

export default PatientCard;