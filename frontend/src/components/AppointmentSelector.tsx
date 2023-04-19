import { Appointment } from "../types/Appointment"
import { createGroups } from "../utils/months";
import AppointmentMonth from "./AppointmentMonth";

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

    const groups = createGroups(appointments);

    return (
        <div>
            {groups.map(({month, appointments}) => <AppointmentMonth key={month} title={month} appointments={appointments}/>)}
        </div>
    )
}

export default AppointmentSelector;