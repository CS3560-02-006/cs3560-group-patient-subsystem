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


type ValueOf<T> = T[keyof T];
export default interface MonthGroup { 
    month: ValueOf<typeof month_names>,
    appointments: Appointment[],
 };