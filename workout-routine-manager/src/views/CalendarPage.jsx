import React, { useState, useEffect, useCallback, useMemo } from "react";
import { LocalizationProvider, StaticDatePicker, PickersDay } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; 
import { TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper } from "@mui/material";
import { supabase } from '../supabase/supabase-client'; 
import _pick from 'lodash/pick';
import PropTypes from 'prop-types';


// import ClearIcon  from "@mui/icons-material/Clear";
// import IconButton from "@mui/material/IconButton";
// import ImputAdornment from "@mui/material/InputAdornment";


// const routines = [
//   { id: 1, name: "Leg Day", exnum: 5, details: ["Squats", "Lunges", "Leg Press", "Calf Raises", "Leg Curls"] },
//   { id: 2, name: "Strength Training", exnum: 4, details: ["Bench Press", "Deadlift", "Pull Ups", "Shoulder Press"] },
//   { id: 3, name: "Cardio", exnum: 3, details: ["Running", "Cycling", "Rowing"] }
// ];

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function CalendarPage() {
  const [selected, setSelected] = useState({});
  const [calendarDates, setCalendarDates] = useState([]); 
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [value, setValue] = useState(new Date());
  const [routineId, setRoutineId] = useState('');
  const [backupRoutineId, setBackupRoutineId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

  const [userId, setUserId] = useState('');
  const [userLoginOpen, setUserLoginOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCalendarData = async () => {
      if(!isLoggedIn || !userId) {
        console.error('User is not logged in. Cannot fetch calendar data.');
        return;
      }
      try {
        setLoading(true);
        const { data: calendarData, error: calendarError } = await supabase
          .from('calendar')
           .select(`
            date,
            routine_date!inner (
              routine_id,
              user_id,
              routines!inner (
                id,
                routineName,
                exercise
              )
            )
          `)
          .eq('routine_date.user_id', userId);

        if (calendarError) {
          console.error('Error fetching calendar dates:', calendarError);
          // console.log('Using fallback test dates');
          // setCalendarDates(['2025-08-01', '2025-08-13', '2025-12-25']);
          return;
        }
        const { data: allRoutines, error: routinesError } = await supabase
          .from('routines')
          .select('*');

        if (routinesError) {
          console.error('Error fetching routines:', routinesError);
          return;
        }
        if(calendarData.length > 0 && calendarData) {
           console.log(`Fetched ${calendarData.length} dates from Supabase:`, calendarData);
        const dates = calendarData.map(item => item.date);
        const uniqueDates = [...new Set(dates)];
        setCalendarDates(uniqueDates);
     const selectedRoutines = {};
          calendarData.forEach(item => {
            if (item.routine_date && item.routine_date.length > 0) {
              const routineData = item.routine_date[0].routines;
              selectedRoutines[item.date] = routineData.id;
            }
          });
          setSelected(selectedRoutines);
        }
        else {
          setCalendarDates([]);
          setSelected({});
          console.log('No calendar data found for the user.');
        }

        if (allRoutines.length > 0) {
          console.log(`Fetched ${allRoutines.length} routines from Supabase:`, allRoutines);
          const formattedRoutines = allRoutines.map(routine => ({
            id: routine.id, 
            name: routine.routineName,
           details: Array.isArray(routine.exercise) ? 
              routine.exercise.map(ex => ex.exerciseName) : 
              [routine.exercise?.exerciseName || 'No exercises']
          }));
          setRoutines(formattedRoutines);
        }
        } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendarData();
  }, [userId, isLoggedIn]);

   const handleUserLogin = () => {
    if (userId.trim()) {
      setIsLoggedIn(true);
      setUserLoginOpen(false);
      console.log(`User ${userId} logged in`);
    }
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDayClick = (newValue) => {
    const oldDay = value.getDate();
    const oldMonth = value.getMonth();
    const oldYear = value.getFullYear();

    const newDay = newValue.getDate();
    const newMonth = newValue.getMonth();
    const newYear = newValue.getFullYear();

    const isSameDay = oldDay === newDay && oldMonth === newMonth && oldYear === newYear;
    
    if (!isSameDay) {
      setValue(newValue);
    }

    if (newValue.getDate() !== value.getDate()) {
      const key = getDateKey(newValue);
      setBackupRoutineId(selected[key] || '');
      setDialogOpen(true);
    }
  };

  const handleMouseOver = useCallback((event, day) => {
    const key = getDateKey(day);
    const routineId = selected[key];
    const routine = routines.find(r => r.id == routineId);
    
    const tooltipText = routine
      ? `${routine.name}\n${routine.details.join(", ")}` 
      : `No workout scheduled`;

    setTooltip({
      visible: true,
      text: tooltipText,
      x: event.pageX,
      y: event.pageY
    });
  }, [selected, routines]);

  const handleMouseOut = useCallback(() => {
    setTooltip({ visible: false, text: "", x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const key = getDateKey(value);
    const selectedRoutineId = selected[key] || '';
    setRoutineId(selectedRoutineId);
    setBackupRoutineId(selectedRoutineId);
  }, [value, selected]);


  const handleRoutineChange = (e) => {
    const key = getDateKey(value);
    setRoutineId(e.target.value);
    setSelected(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleCancel = () => {
    const key = getDateKey(value);
    setRoutineId(backupRoutineId);
    setSelected(prev => ({ ...prev, [key]: backupRoutineId }));
    setDialogOpen(false);
  };

  //------------------------------------------------------------------
  //save routine to database
  //------------------------------------------------------------------

  const handleSaveData = async () => {
    const key = getDateKey(value);
    const selectedRoutineId = routineId;
    if (!selectedRoutineId) {
      console.warn('No routine selected!!!');
      setDialogOpen(false);
      return;
    }
  }

  if(!isLoggedIn) {
    return (
      <div>
        <Dialog open={userLoginOpen} disableEscapeKeyDown>
        <DialogTitle>
          Enter Your UserId
        </DialogTitle>
        <DialogContent>
          <TextField
            label="UserId"
            value={userId}
            onChange={handleUserIdChange}
            fullWidth
            sx={{ mt: 2 }} 
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleUserLogin} disabled={!userId.trim}>Sign In</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }

  // if (loading) {
  //   return <div>Loading calendar...</div>;
  // }

  return (
    <>
      <div>
        <Paper sx={{ p: 2, mb: 2 }}>
          <h2>Workout Calendar</h2>
          <p>Schedule your routine and track completed workout</p>
          <p>{userId}</p>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setIsLoggedIn(false);
              setUserId('');
              setUserLoginOpen(true);
              setCalendarDates([]);
              setSelected({});
            }}
          >
            Change User
          </Button>
        </Paper>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            value={value}
            onChange={handleDayClick}
            displayStaticWrapperAs="desktop"
            slots={{
              day: CustomDay,
              actionBar: () => null
            }}
            slotProps={{
              day: {
                selected,
                routines: routines,
                calendarDates,
                handleMouseOver,
                handleMouseOut
              }
            }}
          />
        </LocalizationProvider>

        <div
          style={{
            position: "fixed",
            top: tooltip.y,
            left: tooltip.x,
            visibility: tooltip.visible ? "visible" : "hidden",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: "14px",
            zIndex: 1000,
            maxWidth: "200px",
            whiteSpace: "pre-line",
            pointerEvents: "none"
          }}
        >
          {tooltip.text}
        </div>

        <Dialog open={dialogOpen} onClose={handleCancel}>
          <DialogTitle>
            Schedule a Workout
            <div style={{ fontSize: "14px", fontWeight: "normal" }}>
              Assign routine for {value.toLocaleDateString()}
            </div>
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
            <Button variant="contained" onClick={() => setDialogOpen(false)}>Save</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

const CustomDay = React.memo(function CustomDay(props) {
  const { day, selected, routines, calendarDates, handleMouseOver, handleMouseOut, ...other } = props;
  
  const key = getDateKey(day);
  const routineId = selected[key];
  const routine = routines.find(r => r.id == routineId);
  const isInCalendarTable = calendarDates.includes(key);

  return (
    <div
      onMouseEnter={(e) => handleMouseOver(e, day)}
      onMouseLeave={handleMouseOut}
    >
      <PickersDay
        {...other}
        day={day}
        sx={{
          borderRadius: "0px !important",
          fontSize: "14px",
          padding: "10px !important",
          bgcolor: isInCalendarTable
            ? "#2196f3 !important"
            : routine 
              ? "#c8e6c9"
              : undefined,
          color: isInCalendarTable ? "white !important" : undefined,
          "&:hover": {
            backgroundColor: isInCalendarTable 
              ? "#1976d2 !important"
              : "#a5d6a7",
          },
        }}
      />
    </div>
  );
});
