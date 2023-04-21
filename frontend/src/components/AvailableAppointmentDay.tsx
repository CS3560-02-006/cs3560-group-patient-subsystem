import React from "react"
import { Appointment } from "../types/Appointment"
import AppointmentMiniCard from "./AppointmentMiniCard";

type AvailableAppointmentDayProps = {
    appointment: Appointment,
    selectHandler: React.Dispatch<React.SetStateAction<Appointment | null>>
};

const AvailableAppointmentDay = ({appointment, selectHandler}: AvailableAppointmentDayProps) => {
    return <AppointmentMiniCard className="bg-slate-200 w-fit p-1" appointment={appointment} onClick={() => selectHandler(appointment)} />
};

export default AvailableAppointmentDay;