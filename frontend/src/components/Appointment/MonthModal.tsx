import React from "react";
import { Appointment } from "../../types/Appointment";

type MonthModalProps = {
  appointments: Appointment[];
  month: string;
  onSelectDay: (appointments: Appointment[]) => void;
  onClose: () => void;
};

const MonthModal = ({
  appointments,
  month,
  onSelectDay,
  onClose,
}: MonthModalProps) => {
  const days = Array.from(
    new Set(appointments.map((app) => app.startTime.getDate()))
  );

  return (
    <div className="bg-white rounded-lg p-4">
      <button onClick={onClose}>Close</button>
      <div className="flex flex-wrap gap-4">
        {days.map((day) => (
          <button
            key={day}
            onClick={() =>
              onSelectDay(
                appointments.filter(
                  (app) => app.startTime.getDate() === day
                )
              )
            }
            className="p-2 bg-gray-200 hover:bg-red-400"
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthModal;