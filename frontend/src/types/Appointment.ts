import { Doctor } from "./Doctor";

export type APPOINTMENT_STATUS = "OPEN" | "RESERVED" | "UNKNOWN";

export const statusFromString = (str: string): APPOINTMENT_STATUS => {
    switch (str.toUpperCase()) {
        case "OPEN":
            return "OPEN";
        case "RESERVED":
            return "RESERVED";
        default:
            return "UNKNOWN";
    }
}

export interface Appointment {
    patient?: string,
    doctor: Doctor,

    start: Date,
    end: Date,

    description: string,
    status: APPOINTMENT_STATUS,
};