import { Doctor } from "./Doctor";
<<<<<<< HEAD

export type APPOINTMENT_STATUS = "OPEN" | "RESERVED" | "UNKNOWN";

export const statusFromString = (str: string): APPOINTMENT_STATUS => {
    switch (str.toUpperCase()) {
        case "OPEN":
            return "OPEN";
        case "RESERVED":
            return "RESERVED";
=======
import { Patient } from "./Patient";

export type APPOINTMENT_STATUS = "AVAILABLE" | "RESERVED" | "UNKNOWN";

export const statusFromString = (str: string): APPOINTMENT_STATUS => {
    switch (str.toUpperCase()) {
        case "AVAILABLE":
        case "RESERVED":
        case "UNKNOWN":
            return str.toUpperCase() as APPOINTMENT_STATUS;
>>>>>>> 4d03f6c (types)
        default:
            return "UNKNOWN";
    }
}

export interface Appointment {
    id: number,
<<<<<<< HEAD
    patient?: string,
=======
    patient?: Patient,
>>>>>>> 4d03f6c (types)
    doctor: Doctor,

    start: Date,
    end: Date,

    description: string,
    status: APPOINTMENT_STATUS,
};