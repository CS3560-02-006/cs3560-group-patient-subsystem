import React from "react";
import { Appointment } from "../types/Appointment";

type AppointmentMiniCardProps = { appointment: Appointment } & React.HTMLProps<HTMLDivElement>;

const AppointmentMiniCard = ({appointment, ...divProps}: AppointmentMiniCardProps) => {
    const { start, end } = appointment;
    return (
        <div {...divProps}>
            <span>{start.getDay()}</span>
            <span>{`${start.getHours()}:${start.getMinutes()}`}</span>
            <span>{`${end.getHours()}:${end.getMinutes()}`}</span>
        </div>
    )
};

export default AppointmentMiniCard;