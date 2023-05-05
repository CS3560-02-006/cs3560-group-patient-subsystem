import { useState } from "react";
import { Appointment } from "../../types/Appointment";
import { createGroups } from "../../utils/months";
import AppointmentMonth from "./AppointmentMonth";
import DayGroup from "./DayGroup";

type AppointmentSelectorProps = {
  appointments: Appointment[];
  setSelectedAppointment: React.Dispatch<
    React.SetStateAction<Appointment | null>
  >;
};

const AppointmentSelector = ({
  appointments,
  setSelectedAppointment,
}: AppointmentSelectorProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDayAppointments, setSelectedDayAppointments] = useState<
    Appointment[]
  >([]);

  const handleAppointmentSelection = (appointment: Appointment | null) => {
    setSelectedAppointment(appointment);
    setSelectedDayAppointments([]);
    setSelectedMonth(null);
};

  const handleMonthClick = (month: string) => {
    if (selectedMonth === month) {
      setSelectedMonth(null);
    } else {
      setSelectedMonth(month);
    }
  };

  const handleDayClick = (appointments: Appointment[]) => {
    setSelectedDayAppointments(appointments);
  };

  const handleCloseDayModal = () => {
    setSelectedDayAppointments([]);
  };

  if (appointments.length === 0) {
    return <div>No available appointments</div>;
  }

  const groups = createGroups(appointments);
  return (
    <div className="">
    {selectedDayAppointments.length > 0 && (
      <DayGroup
        day={selectedDayAppointments[0].startTime.getDate()}
        appointments={selectedDayAppointments}
        selectHandler={handleAppointmentSelection}
      />
    )}
    {groups.map(({ month, appointments, total }) => 
      total > 0 && appointments.some((appointmentGroup) => appointmentGroup.length > 0) ? (
        <div key={`${month} ${total}`}>
          <AppointmentMonth
            title={month}
            onClick={() => handleMonthClick(month)}
          />
          {selectedMonth === month &&
            appointments.map((appointmentGroup) =>
              appointmentGroup.length > 0 ? (
                <DayGroup
                  key={appointmentGroup[0].appointmentID}
                  day={appointmentGroup[0].startTime.getDate()}
                  appointments={appointmentGroup}
                  selectHandler={handleAppointmentSelection}
                />
              ) : null
            )}
        </div>
      ) : null
    )}
  </div>
);
};

export default AppointmentSelector;





// import { Appointment } from "../../types/Appointment"
// import { createGroups } from "../../utils/months";
// import { Fragment } from "react";
// import AppointmentMonth from "./AppointmentMonth";
// import DayGroup from "./DayGroup";

// type AppointmentSelectorProps = {
//     appointments: Appointment[];
//     setSelectedAppointment: React.Dispatch<React.SetStateAction<Appointment | null>>;
// }

// const AppointmentSelector = ({ appointments, setSelectedAppointment }: AppointmentSelectorProps) => {
//     /* note: this assumes all appointsments are available! */

//     /*
//     [
//         [april]
//         {
//             month:
//             day: [appointments]
//         }
//         [may]
//         [june]
//         [july]
//         ...
//     ]
//     */
//    if (appointments.length === 0) {
//     return <div>No available appointments</div>
//    }

//     const groups = createGroups(appointments);
//     return (
//         <div className="">
//             {groups.map(({month, appointments, total}) => total > 0 ? <AppointmentMonth key={`${month} ${total}`} title={month}>
//                 {appointments.map((day, i) => day.length > 0 ? <div className="" key={`${month}${i}`}><DayGroup key={`${month}${i}`} day={i + 1} appointments={day} selectHandler={setSelectedAppointment} /></div> : <Fragment key={`${month}${i}`}></Fragment>)}
//             </AppointmentMonth> : <Fragment key={`${month} ${total}`}></Fragment>)}
//         </div>
//     )
// }

// export default AppointmentSelector;


