import React from "react";
import { Appointment } from "../types/Appointment";

type AppointmentMonthProps = {
    title: string,
    children: React.ReactNode
}

const AppointmentMonth = ({title, children}: AppointmentMonthProps) => {
    return (
        <div>
            <p>{title}</p>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AppointmentMonth;