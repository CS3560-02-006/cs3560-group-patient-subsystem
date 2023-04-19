import { Appointment } from "./Appointment";

export interface Doctor {
    id: number,
    name: string,
    phoneNumber: string,
    emailAddress: string,
    speciality: string,
    appointments: Appointment[],
};