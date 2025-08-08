import React, { useState, useEffect, useCallback, useMemo } from "react";
import { LocalizationProvider, StaticDatePicker, PickersDay } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; 
import { TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper } from "@mui/material";
import { supabase } from '../supabase/supabase-client'; 
import _pick from 'lodash/pick';
import PropTypes from 'prop-types';
import { set } from "lodash";

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
        const userIdInt = parseInt(userId);
        const { data: calendarData, error: calendarError } = await supabase
          .from('routine_date')
          .select(`
            date_id,
            routine_id,
            user_id,
            calendar!inner (
              id,
              date
            ),
            routines!inner (
              id,
              routineName,
              exercise
            )
          `)
          .eq('user_id', userIdInt);

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
          // console.log(`Fetched ${calendarData.length} dates from Supabase:`, calendarData);
          setCalendarDates([...new Set(calendarData.map(item => item.calendar.date))]);
          const selectedRoutines = {};
          calendarData.forEach(item => {
            selectedRoutines[item.calendar.date] = item.routines.id;
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
        } catch (error) { console.error('Error:', error);
      } finally { setLoading(false); }
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
    const oldDay = value.getDate(), oldMonth = value.getMonth(), oldYear = value.getFullYear();
    const newDay = newValue.getDate(), newMonth = newValue.getMonth(), newYear = newValue.getFullYear();
    //const isSameDay = oldDay === newDay && oldMonth === newMonth && oldYear === newYear;

    if (!(oldDay === newDay && oldMonth === newMonth && oldYear === newYear)) {
      setValue(newValue);
    }
    if (newValue.getDate() !== value.getDate()) {
      setBackupRoutineId(selected[getDateKey(newValue)] || '');
      setDialogOpen(true);
    }
  };

  const handleMouseOver = useCallback((event, value) => {
    const routine = routines.find(r => r.id == selected[getDateKey(value)]);
    
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
    const selectedRoutineId = selected[getDateKey(value)] || '';
    setRoutineId(selectedRoutineId);
    setBackupRoutineId(selectedRoutineId);
  }, [value, selected]);

  const handleRoutineChange = (e) => {
    setRoutineId(e.target.value);
    setSelected(prev => ({ ...prev, [getDateKey(value)]: e.target.value }));
  };

  const handleCancel = () => {
    setRoutineId(backupRoutineId);
    setSelected(prev => ({ ...prev, [getDateKey(value)]: backupRoutineId }));
    setDialogOpen(false);
  };

  //------------------------------------------------------------------
  //save routine to database
  //------------------------------------------------------------------

  const refreshCalendarData = async () => {
    try {
      const userIdInt = parseInt(userId);
      const { data: calendarData, error: calendarError} = await supabase
        .from('_routine_date')
        .select('date_id, routine_id, user_id, calendar!inner(id, date), exercise!inner(id, routineName, exercise)')
        .eq('user_id', userIdInt);

      if (calendarError) {
        console.error('Error fetching calendar data:', calendarError);
        return;
      }
      if(calendarData && calendarData.length > 0) {
        console.log(`Fetched ${calendarData.length} calendar entries from Supabase:`, calendarData);
        setCalendarDates([...new Set(calendarData.map(item => item.calendar.date))]);
        const selectedRoutines = {};
        calendarData.forEach(item => {
          selectedRoutines[item.calendar.date] = item.routines.id;
          });
          setSelected(selectedRoutines);
      }  else {
          setCalendarDates([]);
          setSelected({});
          console.log('No calendar data found for the user.');
        }
       } catch (error) {
        console.error('Error:', error);
      }
    };


  const handleSaveData = async () => {
    //const key = getDateKey(value);
    const selectedRoutineId = routineId;
    const userIdInt = parseInt(userId);

    if (!userIdInt) {
      console.warn('No user ID provided!!!');
      setDialogOpen(false);
      return;
    }

    if(!getDateKey(value)) {
      console.warn('No date key found!!!');
      setDialogOpen(false);
      return;
    }

    try{
      if(!selectedRoutineId) {
        console.warn('No routine selected!!!');
        await handleRemoveRoutine();
        return;
      }
      const { data: existingCalendar, error: checkError } = await supabase
        .from('calendar')
        .select('id')
        .eq('date', getDateKey(value))
        .single();

      if (checkError) {
        console.error('Error checking existing calendar entry:', checkError);
        return;
      }

      if (existingCalendar) {
      let calendarId = existingCalendar.id;
        console.log('Step 2: Using existing calendar ID:', calendarId);
      } else {
        console.log('Step 2: Creating new calendar entry...');
        const { data: newCalendar, error: calendarError } = await supabase
          .from('calendar')
          .insert([{ date: getDateKey(value) }])
          .select()
          .single();

        console.log('New calendar result:', newCalendar);
        console.log('New calendar error:', calendarError);
        if (calendarError) {
          console.error('Error creating new calendar entry:', insertError);
          return;
        }
        if (!newCalendar) {
          console.error('No calendar data returned after insert');
          return;
        } calendarId = newCalendar.id;
        if(!calendarId) {
          console.warn('No calendar ID found!!!');
          return;
        }

         // Давайте попробуем более простой запрос сначала
      console.log('Trying to fetch all routine_date records first...');
      const { data: allRoutineDates, error: allRoutineDatesError } = await supabase
        .from('routine_date')
        .select('*')
        .limit(5);

      console.log('All routine_date records (first 5):', allRoutineDates);
      console.log('All routine_date error:', allRoutineDatesError);

      // // Теперь попробуем найти запись с правильными полями
      // // Используем названия полей из вашей БД (из первого скриншота видно date_id, user_id, routine_id)
      // const { data: existingRoutineDate, error: routineDateCheckError } = await supabase
      //   .from('routine_date')
      //   .select('*') // Получаем все поля чтобы увидеть структуру
      //   .eq('date_id', calendarId)
      //   .eq('user_id', userIdInt);

      // console.log('Routine_date check result:', existingRoutineDate);
      // console.log('Routine_date check error:', routineDateCheckError);

      // if (routineDateCheckError) {
      //   console.error('Error checking existing routine_date:', routineDateCheckError);
      //   console.error('Error details:', JSON.stringify(routineDateCheckError, null, 2));
      //   return;
      // }

      // Теперь попробуем создать новую запись в routine_date
      const { data: updateResult, error: updateError } = await supabase
        .from('routine_date')
        .update({
            routine_id: selectedRoutineId,
          })
          .eq('date_id', calendarId)
          .eq('user_id', userIdInt)
          .select();

      if (updateError) {
        console.error('Error updating routine_date entry:', updateError);
        return;
      } else {
        console.log('Routine_date entry updated successfully:', updateResult);
        const insertData = {
          date_id: calendarId,
          user_id: userIdInt,
          routine_id: selectedRoutineId
        };
        if(!insertData.date_id || !insertData.user_id || !insertData.routine_id) {
          console.warn('Missing required fields in insertData:', insertData);
          return;
        }
        const { data: insertResult, error: insertError } = await supabase
          .from('routine_date')
          .insert([insertData])
          .select()
          .single();

        if (insertError) {
          console.error('Error creating new routine_date entry:', insertError);
          return;
        } if (!insertResult) {
          console.error('No routine_date data returned after insert');
          return;
        }
        console.log('New routine_date entry created successfully:', insertResult);
      }
    }
    await refreshCalendarData();
    setDialogOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  //remove routine 
  //---------------------------------------------------------------

  const handleRemoveData = async () => {
    //const selectedRoutineId = selected[getDateKey(value)];
    const userIdInt = parseInt(userId);

    try {
      const { data: calendarData, error: calendarError } = await supabase
        .from('calendar')
        .select('id')
        .eq('date', getDateKey(value))
        .single();

      if (calendarError) {
        console.error('Error removing routine:', calendarError);
        setDialogOpen(false);
        return;
      }
      console.log('Found calendar entry:', calendarData);
      const {error: deleteError} = await supabase
        .from('routine_date')
        .delete()
        .eq('date_id', calendarData.id)
        .eq('user_id', userIdInt);

      if (deleteError) {
        console.error('Error removing routine:', deleteError);
        setDialogOpen(false);
        return;
      }

      console.log('Routine removed successfully:', calendarData);
      const {data: checking, error: checkError} = await supabase
        .from('routine_date')
        .select('id')
        .eq('date_id', calendarEntry.id);

      if (checkError) {
        console.log('Error checking routine data:', checkError);
        return;
      } 

      if(checking.length === 0) {
        const { error: deleteError } = await supabase
          .from('calendar')
          .delete()
          .eq('id', calendarEntry.id);

        if (deleteError) {
          console.error('Error removing routine:', deleteError);
          setDialogOpen(false);
          return;
        }
        console.log('Calendar entry removed successfully:', calendarEntry);
      }
      await refreshCalendarData();
      setRoutineId('');
      setDialogOpen(false);
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

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

        {/* <Dialog open={dialogOpen} onClose={handleCancel}>*/}
         <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
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
              <MenuItem value="">
                <em>No routine</em>
              </MenuItem>
              {routines.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleSaveData}>Save</Button>
            {routineId && (
              <Button variant="outlined" color="error" onClick={handleRemoveData}>
                Remove
              </Button>
            )}
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

const CustomDay = React.memo(function CustomDay(props) {
  const { day, selected, routines, calendarDates, handleMouseOver, handleMouseOut, ...other } = props;
  const routine = routines.find(r => r.id == selected[getDateKey(day)]);
  const isInCalendarTable = calendarDates.includes(getDateKey(day));

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
