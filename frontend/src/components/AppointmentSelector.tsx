import { Appointment } from "../types/Appointment"
import { createGroups } from "../utils/months";
import { Fragment } from "react";
import AppointmentMonth from "./AppointmentMonth";
import DayGroup from "./DayGroup";

type AppointmentSelectorProps = {
    appointments: Appointment[];
    setSelectedAppointment: React.Dispatch<React.SetStateAction<Appointment | null>>;
}

const AppointmentSelector = ({ appointments, setSelectedAppointment }: AppointmentSelectorProps) => {
    /* note: this assumes all appointsments are available! */

    /*
    [
        [april]
        {
            month:
            day: [appointments]
        }
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
        <div className="">
            {groups.map(({month, appointments, total}) => total > 0 ? <AppointmentMonth key={`${month} ${total}`} title={month}>
                {appointments.map((day, i) => day.length > 0 ? <div className="" key={`${month}${i}`}><DayGroup key={`${month}${i}`} day={i + 1} appointments={day} selectHandler={setSelectedAppointment} /></div> : <Fragment key={`${month}${i}`}></Fragment>)}
            </AppointmentMonth> : <Fragment key={`${month} ${total}`}></Fragment>)}
        </div>
    )
}

export default AppointmentSelector;