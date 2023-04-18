import { Appointment } from "./Appointment";

export interface Doctor {
    name: string,
    phoneNumber: string,
    emailAddress: string,
    speciality: string,
    appointments: Appointment[],
};