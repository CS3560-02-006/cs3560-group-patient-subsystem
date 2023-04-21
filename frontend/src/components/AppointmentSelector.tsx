import { Appointment } from "../types/Appointment"
import { createGroups } from "../utils/months";
import AppointmentMonth from "./AppointmentMonth";
import AvailableAppointmentDay from "./AvailableAppointmentDay";

type AppointmentSelectorProps = {
    appointments: Appointment[];
    setSelectedAppointment: React.Dispatch<React.SetStateAction<Appointment | null>>;
}

const AppointmentSelector = ({ appointments, setSelectedAppointment }: AppointmentSelectorProps) => {
    /* note: this assumes all appointsments are available! */

    /*
    [
        [april]
        [may]
        [june]
        [july]
        ...
    ]
    */
   if (appointments.length === 0) {
    return <div>No available appointments</div>
   }

    const groups = createGroups(appointments);

    return (
        <div>
            {groups.map(({month, appointments: apps}) => <AppointmentMonth key={month} title={month}>
                {apps.map(a => <AvailableAppointmentDay key={a.id} appointment={a} selectHandler={setSelectedAppointment} />)}
            </AppointmentMonth>)}
        </div>
    )
}

export default AppointmentSelector;