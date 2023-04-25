import { useState } from "react";
import { Appointment } from "../types/Appointment";
import AppointmentMiniCard from "./AppointmentMiniCard";

type DayGroupProps = {
    day: number,
    appointments: Appointment[],
    selectHandler: React.Dispatch<React.SetStateAction<Appointment | null>>,
}

const DayGroup = ({ day, appointments, selectHandler }: DayGroupProps) => {
    const [visible, toggleVisible] = useState<boolean>(false);
    
    return (
        <div onClick={() => toggleVisible(!visible)}>
            <div>{day}</div>
            {visible && appointments.map(app => <AppointmentMiniCard key={app.id} appointment={app} onClick={() => selectHandler(app)} />)}
        </div>
    )
}

export default DayGroup