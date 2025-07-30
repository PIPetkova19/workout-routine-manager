import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function CustomCalendar({ routines, selected, onSelectRoutine }) {
  const [value, setValue] = React.useState(new Date());
  const [routineId, setRoutineId] = React.useState('');

  React.useEffect(() => {
    const key = value.toISOString().slice(0, 10);
    setRoutineId(selected[key] || '');
  }, [value, selected]);

  const handleRoutineChange = (e) => {
    setRoutineId(e.target.value);
    const key = value.toISOString().slice(0, 10);
    onSelectRoutine(key, e.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
      <TextField
        select
        label="Choose Routine"
        value={routineId}
        onChange={handleRoutineChange}
        sx={{ mt: 2 }}
      >
        {routines.map((routine) => (
          <MenuItem key={routine.id} value={routine.id}>
            {routine.name}
          </MenuItem>
        ))}
      </TextField>
    </LocalizationProvider>
  );
}
