import { useState } from "react";
import { Appointment } from "../../types/Appointment";
import AppointmentMiniCard from "./AppointmentMiniCard";
import numberCompare from "../../utils/compare";

type DayGroupProps = {
    day: number,
    appointments: Appointment[],
    selectHandler: (appointment: Appointment | null) => void,
}

const DayGroup = ({ day, appointments, selectHandler }: DayGroupProps) => {
    const [visible, toggleVisible] = useState<boolean>(false);

    const childClickHandler = (e: React.MouseEvent, f: Function) => {
        e.preventDefault();
        e.stopPropagation();

        f();
    }

    return (
        <div className="cursor-pointer bg-gray-100 hover:bg-blue-300 rounded-lg p-2" onClick={() => toggleVisible(!visible)}>
            <div><span className="font-bold">{day}</span>: {appointments.length} available</div>
            {visible && <div className="cursor-pointer w-full flex flex-wrap gap-2">
                {
                appointments.sort((a, b) => {
                    const startcmp = numberCompare(a.startTime.getHours(), b.startTime.getHours());

                    if (startcmp === 0) {
                        return numberCompare(a.endTime.getHours(), b.endTime.getHours())
                    }

                    return startcmp;
                }).map(app => <AppointmentMiniCard className="hover:bg-orange-300 rounded-md p-px" key={app.appointmentID} appointment={app} onClick={(e) => childClickHandler(e, () => selectHandler(app))} />)}
                </div>}
        </div>
    )
}

export default DayGroup