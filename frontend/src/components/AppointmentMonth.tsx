import React from "react";

type AppointmentMonthProps = {
    title: string,
    children: React.ReactNode
}

const AppointmentMonth = ({title, children}: AppointmentMonthProps) => {
    return (
        <div>
            <p>{title} (24-hour clock)</p>
            <div className="flex flex-wrap gap-4">
                {children}
            </div>
        </div>
    )
}

export default AppointmentMonth;