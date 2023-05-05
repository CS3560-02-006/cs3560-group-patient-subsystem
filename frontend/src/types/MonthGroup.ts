import { Appointment } from "./Appointment";

export const month_names: Record<number, string> = {
    1: "January",
    2: "Feburary",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
};

export const getMonthFromNumber = (month: number): string => {
    if (month in month_names) {
        return month_names[month];
    }

    return "Unknown month " + month;
}

 export class MonthGroup {
    month: string;
    appointments: Appointment[][];
    total: number;

    constructor(month: string) {
        this.month = month;
        this.appointments = Array(32);
        this.total = 0;
        for (let i = 0; i < this.appointments.length; i++) {
            this.appointments[i] = [];
        }
    }

    pushAppointment(day: number, appointment: Appointment) {
        this.appointments[day].push(appointment);
        this.total += 1;
    }

    getDayAppointments(day: number): Appointment[] {
        return this.appointments[day];
    }
 }