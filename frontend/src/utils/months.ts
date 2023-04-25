import { Appointment } from "../types/Appointment";
import { MonthGroup } from "../types/MonthGroup";
import { getMonthFromNumber } from "../types/MonthGroup";


export const createGroups = (appointments: Appointment[]): MonthGroup[] => {
    console.log("createGroups", appointments)
    let groups: MonthGroup[] = Array(12);
    for (let i = 0; i < 12; i++ ) {
        groups.push(new MonthGroup(getMonthFromNumber(i + 1)))
    }

    appointments.forEach((appointment) => {
        groups[appointment.startTime.getMonth()].pushAppointment(appointment.startTime.getDay(), appointment);
    })

    return groups;
}
