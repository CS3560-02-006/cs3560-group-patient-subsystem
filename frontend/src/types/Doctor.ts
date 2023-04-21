import { Appointment } from "./Appointment";

export interface Doctor {
    doctorID: number,
    name: string,
    phoneNumber: string,
    emailAddress: string,
    speciality: string,
    appointments: Appointment[],
};