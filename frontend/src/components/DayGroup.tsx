import { useState } from "react";
import { Appointment } from "../types/Appointment";
import AppointmentMiniCard from "./AppointmentMiniCard";
import numberCompare from "../utils/compare";

type DayGroupProps = {
    day: number,
    appointments: Appointment[],
    selectHandler: React.Dispatch<React.SetStateAction<Appointment | null>>,
}

const DayGroup = ({ day, appointments, selectHandler }: DayGroupProps) => {
    const [visible, toggleVisible] = useState<boolean>(false);

    const childClickHandler = (e: React.MouseEvent, f: Function) => {
        e.preventDefault();
        e.stopPropagation();

        f();
    }
    return (
        <div onClick={() => toggleVisible(!visible)}>
            <div>{day}: {appointments.length} available</div>
            {visible && <div className="grid grid-cols-4">{appointments.sort((a, b) => {
                const startcmp = numberCompare(a.startTime.getHours(), b.startTime.getHours());

                if (startcmp === 0) {
                    return numberCompare(a.endTime.getHours(), b.endTime.getHours())
                }

                return startcmp;
            }).map(app => <AppointmentMiniCard key={app.id} appointment={app} onClick={(e) => childClickHandler(e, () => selectHandler(app))} />)}</div>}
        </div>
    )
}

export default DayGroup