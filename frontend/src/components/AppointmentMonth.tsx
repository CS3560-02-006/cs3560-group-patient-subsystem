import React from "react";

type AppointmentMonthProps = {
    title: string,
    children: React.ReactNode
}

const AppointmentMonth = ({title, children}: AppointmentMonthProps) => {
    return (
        <div>
            <p>{title} (24-hour clock)</p>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AppointmentMonth;