import { Patient } from "../types/Patient"

type PatientCardProps = {
    patient: Patient;
    setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>
}

const PatientCard = ({patient, setSelectedPatient}: PatientCardProps) => {
    const { address } = patient;
    return (
        <div onClick={() => setSelectedPatient(patient)} className="flex items-stretch">
            <div>{patient.name}</div>
            <div>
                <div>{patient.phoneNumber}</div>
                <div>{address.city}, {address.state}</div>
                <div>{patient.insuranceProvider}</div>
            </div>
        </div>
    )
}

export default PatientCard;