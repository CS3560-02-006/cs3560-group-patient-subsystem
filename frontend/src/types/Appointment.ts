import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export type APPOINTMENT_STATUS = "available" | "scheduled" | "unknown";

export const statusFromString = (str: string): APPOINTMENT_STATUS => {
    switch (str.toLowerCase()) {
        case "available":
        case "reserved":
        case "unknown":
            return str.toLowerCase() as APPOINTMENT_STATUS;
        default:
            return "unknown";
    }
}

export interface Appointment {
    id: number,
    patient?: Patient,
    doctor: Doctor,

    startTime: Date,
    endTime: Date,

    description: string,
    status: APPOINTMENT_STATUS,
};