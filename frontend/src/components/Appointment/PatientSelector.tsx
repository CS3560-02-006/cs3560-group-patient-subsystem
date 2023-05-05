import React from "react";
import { Patient } from "../../types/Patient";
import PatientCard from "./PatientCard";
import Modal from "../../layout/Modal";

type PatientSelectorProps = {
  patientList: Patient[];
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  closePatientSelector: () => void;
};

const PatientSelector = ({ patientList, setSelectedPatient, closePatientSelector }: PatientSelectorProps) => {
  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    closePatientSelector();
  };

  return (
    <Modal>
      <button onClick={closePatientSelector}>Close</button>
      <div className="flex flex-wrap gap-4">
        {patientList.map((patient) => (
          <PatientCard key={patient.patientID} patient={patient} setSelectedPatient={handlePatientSelect} />
        ))}
      </div>
    </Modal>
  );
};

export default PatientSelector;