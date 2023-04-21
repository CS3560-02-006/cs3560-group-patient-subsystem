import { Appointment } from "../types/Appointment";
import MonthGroup, { getMonthFromNumber } from "../types/MonthGroup";


export const createGroups = (appointments: Appointment[]): MonthGroup[] => {
    console.log("createGroups", appointments)
    const groups: MonthGroup[] = [{
        month: getMonthFromNumber(appointments[0].startTime.getMonth()),
        appointments: [],
    }];

    appointments.forEach((appointment) => {
        const m = getMonthFromNumber(appointment.startTime.getMonth())
        if (m === groups[groups.length - 1].month) {
            groups[groups.length - 1].appointments.push(appointment)
        } else {
            groups.push({
                month: m,
                appointments: [appointment],
            })
        }
    })

    return groups;
}
