

export interface Doctor {
    doctorID: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    speciality: string;
    appointments: Appointment[];
  }

export interface Appointment {
    appointmentID: string;
    doctorID: string;
    patientID: number;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    description: string;
}
  