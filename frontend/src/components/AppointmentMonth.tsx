import { Appointment } from "../types/Appointment";

type AppointmentMonthProps = {
    title: string,
    appointments: Appointment[],
}

const AppointmentMonth = ({title, appointments}: AppointmentMonthProps) => {
    return (
        <div>
            <p>{title}</p>
        </div>
    )
}

export default AppointmentMonth;