import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
<<<<<<< HEAD

export type APPOINTMENT_STATUS = "AVAILABLE" | "RESERVED" | "UNKNOWN";

export const statusFromString = (str: string): APPOINTMENT_STATUS => {
    switch (str.toUpperCase()) {
        case "AVAILABLE":
        case "RESERVED":
        case "UNKNOWN":
            return str.toUpperCase() as APPOINTMENT_STATUS;
        default:
            return "UNKNOWN";
    }
}

export interface Appointment {
    id: number,
    patient?: Patient,
    doctor: Doctor,

    start: Date,
    end: Date,

    description: string,
    status: APPOINTMENT_STATUS,
};