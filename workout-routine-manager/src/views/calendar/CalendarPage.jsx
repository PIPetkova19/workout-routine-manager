import React, { useState } from "react";
import CustomCalendar from "./calendar";

const routines = [
  { id: 1, name: "Leg Day" },
  { id: 2, name: "Strength Training" },
  { id: 3, name: "Cardio" }
];

export default function CalendarPage() {
  const [selected, setSelected] = useState({});
  return (
    <div>
      <h2>Workout Calendar</h2>
      <CustomCalendar
        routines={routines}
        selected={selected}
        onSelectRoutine={(date, routineId) => {
          setSelected(prev => ({ ...prev, [date]: routineId }));
        }}
      />
    </div>
  );
}