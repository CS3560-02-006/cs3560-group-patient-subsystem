import { APPOINTMENT_STATUS } from "./Appointment";

export interface CreateAppointmentRequest {
    description?: string,
    patientID: number,
    doctorID: number,
    appointmentID: number,
    status: APPOINTMENT_STATUS,
}