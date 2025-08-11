import React, { useState, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const routines = [ 
  { id: 1, name: "Leg Day", exnum: 5, details: ["Squats", "Lunges", "Leg Press", "Calf Raises", "Leg Curls"] },
  { id: 2, name: "Strength Training", exnum: 4, details: ["Bench Press", "Deadlift", "Pull Ups", "Shoulder Press"] },
  { id: 3, name: "Cardio", exnum: 3, details: ["Running", "Cycling", "Rowing"] }
];

export default function CalendarPage() {
  const [selected, setSelected] = useState({});
  const [value, setValue] = useState(new Date());
  const [routineId, setRoutineId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const key = value.toISOString().slice(0, 10);
    setRoutineId(selected[key] || '');
  }, [value, selected]);

  const handleDayClick = (newValue) => {
    setValue(newValue);
    setDialogOpen(true);
  };

  const handleRoutineChange = (e) => {
    setRoutineId(e.target.value);
    const key = value.toISOString().slice(0, 10);
    setSelected(prev => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div>
      <Paper>
        <h2>Workout Calendar</h2>

        <p>Schedule your routine and track completed workout</p>
      </Paper>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={value}
          onChange={handleDayClick}
          renderInput={(params) => <TextField {...params} />}
          slots={{ actionBar: () => null }}
        />
      </LocalizationProvider>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>
          <h3>Schedule a Workout</h3>
          Assign routine for {value.toLocaleDateString()}
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Select Routine"
            value={routineId}
            onChange={handleRoutineChange}
            fullWidth
            sx={{ mt: 2 }}
          >
            {routines.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setDialogOpen(false)}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}