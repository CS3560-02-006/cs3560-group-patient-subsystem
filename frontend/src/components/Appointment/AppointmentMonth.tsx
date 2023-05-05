import React from "react";

type AppointmentMonthProps = {
    title: string,
    children?: React.ReactNode,
    onClick: () => void,
}

const AppointmentMonth = ({title, children, onClick}: AppointmentMonthProps) => {
    return (
        <div>
            <p className='cursor-pointer' onClick={onClick}>{title}</p>
            <div className="flex flex-wrap gap-4">
                {children}
            </div>
        </div>
    )
}

export default AppointmentMonth;