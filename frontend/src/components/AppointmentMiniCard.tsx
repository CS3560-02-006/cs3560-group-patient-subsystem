import React from "react";
import { Appointment } from "../types/Appointment";
import { getMonthFromNumber } from "../types/MonthGroup";

type AppointmentMiniCardProps = { appointment: Appointment } & Omit<React.HTMLProps<HTMLDivElement>, "key">;

const timeString = (date: Date): string => {
    const padded = (n: number): string => n.toLocaleString(undefined, { minimumIntegerDigits: 2});

    return `${padded(date.getHours())}:${padded(date.getMinutes())}`;
}

const AppointmentMiniCard = ({appointment, ...divProps}: AppointmentMiniCardProps) => {
    const { startTime, endTime } = appointment;
    return (
        <div {...divProps}>
            <span className="font-bold">{getMonthFromNumber(startTime.getMonth() + 1)} {(startTime.getDay() + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 })}: </span>
            <span>{timeString(startTime)}-{timeString(endTime)}</span>
        </div>
    )
};

export default AppointmentMiniCard;