import React, { useState, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Paper,
  useTheme 
} from '@mui/material';

const routines = [ 
  { id: 1, name: "Leg Day", exnum: 5, details: ["Squats", "Lunges", "Leg Press", "Calf Raises", "Leg Curls"] },
  { id: 2, name: "Strength Training", exnum: 4, details: ["Bench Press", "Deadlift", "Pull Ups", "Shoulder Press"] },
  { id: 3, name: "Cardio", exnum: 3, details: ["Running", "Cycling", "Rowing"] }
];

export default function CalendarPage() {
  const theme = useTheme();
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
    <Box sx={{ color: theme.palette.text.primary }}>
      <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
        Workout Calendar
      </Typography>
      
      <Paper 
        sx={{ 
          p: 3, 
          mb: 3, 
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Schedule your routine and track completed workouts
        </Typography>
      </Paper>

      <Box sx={{ 
        backgroundColor: theme.palette.background.paper, 
        borderRadius: 2, 
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={handleDayClick}
            renderInput={(params) => <TextField {...params} />}
            slots={{ actionBar: () => null }}
            sx={{
              '& .MuiPickersDay-root': {
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
              '& .MuiPickersCalendarHeader-root': {
                color: theme.palette.text.primary,
              },
              '& .MuiPickersYear-yearButton': {
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              },
            }}
          />
        </LocalizationProvider>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="h3">
            Schedule a Workout
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
            Assign routine for {value.toLocaleDateString()}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Select Routine"
            value={routineId}
            onChange={handleRoutineChange}
            fullWidth
            sx={{ mt: 2 }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }
                }
              }
            }}
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
            sx={{ mr: 1 }}
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
    </Box>
  );
}