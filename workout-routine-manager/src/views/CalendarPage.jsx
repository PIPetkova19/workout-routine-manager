import React, { useState, useEffect, useCallback, useMemo } from "react";
import { LocalizationProvider, StaticDatePicker, PickersDay } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; 
import { TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper } from "@mui/material";
import { supabase } from '../supabase/supabase-client'; 
import _pick from 'lodash/pick';
import PropTypes from 'prop-types';
import { set } from "lodash";
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
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

  const [routineColors, setRoutineColors] = useState({});
  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const [selectedRoutineForColor, setSelectedRoutineForColor] = useState('');

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

        const {data: routineColors, error: colorsError} = await supabase
          .from('routine_colors')
          .select('*')
          .eq('user_id', userIdInt);

          if(!colorsError && routineColors) {
            const colorsMap = {};
            routineColors.forEach(item => {
              colorsMap[item.routine_id] = item.color;
            });
            setRoutineColors(colorsMap);
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
    const isSameDay = oldDay === newDay && oldMonth === newMonth && oldYear === newYear;

    if (!isSameDay) {
      setValue(newValue);
    }
    if (newValue.getDate() !== value.getDate()) {
      const currentRoutineId = selected[getDateKey(newValue)] || '';
      setRoutineId(currentRoutineId);
      setBackupRoutineId(currentRoutineId);
      setDialogOpen(true);
    }

  //    setValue(newValue);

  // const currentRoutineId = selected[getDateKey(newValue)] || '';
  // setRoutineId(currentRoutineId);
  // setBackupRoutineId(currentRoutineId);
  // setDialogOpen(true);
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
    // setRoutineId(selectedRoutineId);
    // setBackupRoutineId(selectedRoutineId);
  }, [value, selected]);

const handleRoutineChange = (e) => {
  console.log('Routine changed to:', e.target.value);
  setRoutineId(e.target.value);
};

  const handleCancel = () => {
    setRoutineId(backupRoutineId);
    //setSelected(prev => ({ ...prev, [getDateKey(value)]: backupRoutineId }));
    setDialogOpen(false);
  };

  //------------------------------------------------------------------
  //save routine to database
  //------------------------------------------------------------------

  const refreshCalendarData = async () => {
    try {
      const userIdInt = parseInt(userId);
      console.log('Refreshing calendar data for user:', userIdInt);
      
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
        console.error('Error fetching calendar data:', calendarError);
        return;
      }

      const { data: routineColorsData, error: colorsError } = await supabase
      .from('routine_colors')
      .select('*')
      .eq('user_id', userIdInt);

    if (!colorsError && routineColorsData) {
      const colorsMap = {};
      routineColorsData.forEach(item => {
        colorsMap[item.routine_id] = item.color;
      });
      setRoutineColors(colorsMap);
      console.log('Updated routine colors:', colorsMap);
    }

      if (calendarData && calendarData.length > 0) {
        console.log('Fetched calendar data:', calendarData);
        setCalendarDates([...new Set(calendarData.map(item => item.calendar.date))]);
        
        const selectedRoutines = {};
        calendarData.forEach(item => {
          selectedRoutines[item.calendar.date] = item.routines.id;
        });
        setSelected(selectedRoutines);
      } else {
        setCalendarDates([]);
        setSelected({});
        console.log('No calendar data found');
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };


  const handleSaveData = async () => {
    const selectedRoutineId = routineId && routineId !== '' ? parseInt(routineId) : null;
    const userIdInt = parseInt(userId);

    console.log('=== SAVE ROUTINE START ===');
    console.log('Date:', getDateKey(value));
    console.log('Routine ID:', selectedRoutineId);
    console.log('User ID:', userIdInt);

    if (!userIdInt) {
      console.warn('No user ID provided!!!');
      setDialogOpen(false);
      return;
    }

    if (!getDateKey(value)) {
      console.warn('No date key found!!!');
      setDialogOpen(false);
      return;
    }

    try {
      if (!selectedRoutineId || selectedRoutineId === '' || isNaN(selectedRoutineId)) {
        console.warn('No routine selected - removing existing entry');
        await handleRemoveData();
        return;
      }
      console.log('Step 1: Checking calendar entry...');
      const { data: existingCalendar, error: checkError } = await supabase
        .from('calendar')
        .select('id')
        .eq('date', getDateKey(value))
        .maybeSingle(); 

      let calendarId;

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing calendar entry:', checkError);
        return;
      }

      if (existingCalendar) {
        calendarId = existingCalendar.id;
        console.log('Using existing calendar ID:', calendarId);
      } else {
        console.log('Creating new calendar entry...');
        const { data: newCalendar, error: calendarError } = await supabase
          .from('calendar')
          .insert([{ date: getDateKey(value) }])
          .select()
          .single();

        if (calendarError) {
          console.error('Error creating new calendar entry:', calendarError);
          return;
        }
        
        if (!newCalendar) {
          console.error('No calendar data returned after insert');
          return;
        }
        
        calendarId = newCalendar.id;
        console.log('Created new calendar ID:', calendarId);
      }

      if (!calendarId) {
        console.warn('No calendar ID found!!!');
        return;
      }

      console.log('Step 2: Checking routine_date entry...');
      const { data: existingRoutineDate, error: routineDateError } = await supabase
        .from('routine_date')
        .select('*')
        .eq('date_id', calendarId)
        .eq('user_id', userIdInt)
        .maybeSingle(); 

      if (routineDateError && routineDateError.code !== 'PGRST116') {
        console.error('Error checking routine_date:', routineDateError);
        return;
      }

      if (existingRoutineDate) {
        console.log('Updating existing routine_date...');
        const { error: updateError } = await supabase
          .from('routine_date')
          .update({ routine_id: selectedRoutineId })
          .eq('date_id', calendarId)
          .eq('user_id', userIdInt);

        if (updateError) {
          console.error('Error updating routine_date entry:', updateError);
          return;
        }
        
        console.log('Routine_date entry updated successfully');
      } else {
        console.log('Creating new routine_date entry...');
        const insertData = {
          date_id: calendarId,
          user_id: userIdInt,
          routine_id: selectedRoutineId
        };

        if (!insertData.date_id || !insertData.user_id || !insertData.routine_id) {
          console.warn('Missing required fields in insertData:', insertData);
          return;
        }

        const { data: insertResult, error: insertError } = await supabase
          .from('routine_date')
          .insert([insertData])
          .select();

        if (insertError) {
          console.error('Error creating new routine_date entry:', insertError);
          return;
        }
        
        if (!insertResult || insertResult.length === 0) {
          console.error('No routine_date data returned after insert');
          return;
        }
        
        console.log('New routine_date entry created successfully:', insertResult[0]);
      }
      setSelected(prev => ({ ...prev, [getDateKey(value)]: selectedRoutineId }));

      await refreshCalendarData();
      setDialogOpen(false);
      console.log('=== SAVE ROUTINE COMPLETED ===');

    } catch (error) {
      console.error('Error in handleSaveData:', error);
    }
  };


  //remove routine
  //remove routine 
  //---------------------------------------------------------------

  const handleRemoveData = async () => {
    const userIdInt = parseInt(userId);

    try {
      const { data: calendarData, error: calendarError } = await supabase
        .from('calendar')
        .select('id')
        .eq('date', getDateKey(value))
        .maybeSingle();

      if (calendarError) {
        console.error('Error finding calendar entry:', calendarError);
        setDialogOpen(false);
        return;
      }

       if (!calendarData) {
      console.log('No calendar entry found to remove');
      setSelected(prev => {
        const newSelected = { ...prev };
        delete newSelected[getDateKey(value)];
        return newSelected;
      });
      setDialogOpen(false);
      return;
    }
      console.log('Found calendar entry:', calendarData);

      const { error: deleteError } = await supabase
        .from('routine_date')
        .delete()
        .eq('date_id', calendarData.id)
        .eq('user_id', userIdInt);

      if (deleteError) {
        console.error('Error removing routine:', deleteError);
        setDialogOpen(false);
        return;
      }

      console.log('Routine removed successfully');
    const { data: remainingEntries } = await supabase
      .from('routine_date')
      .select('*')
      .eq('date_id', calendarData.id);

    if (!remainingEntries || remainingEntries.length === 0) {
      await supabase
        .from('calendar')
        .delete()
        .eq('id', calendarData.id);
    }
    setSelected(prev => {
      const newSelected = { ...prev };
      delete newSelected[getDateKey(value)];
      return newSelected;
    });

    await refreshCalendarData();
    setRoutineId('');
    setDialogOpen(false);
    console.log('Routine removed successfully');

  } catch (error) {
    console.error('Error in handleRemoveData:', error);
  }
};

//--------------------------------------------------------------------
//routine colors
//--------------------------------------------------------------------

const ROUTINE_COLORS = [
  { value: '#f44336', name: 'Red' },
  { value: '#9c27b0', name: 'Purple' },
  { value: '#3f51b5', name: 'Indigo' },
  { value: '#2196f3', name: 'Blue' },
  { value: '#4caf50', name: 'Green' },
  { value: '#8bc34a', name: 'Light Green' },
  { value: '#ffeb3b', name: 'Yellow' },
  { value: '#ff9800', name: 'Orange' },
];

const getColorByName = (colorName) => {
  const colorObj = ROUTINE_COLORS.find(color => color.name === colorName);
  return colorObj ? colorObj.value : '#2196f3'; 
};

const handleColorEdit = (routine) => {
  setSelectedRoutineForColor(routine);
  setColorDialogOpen(true);
};

const handleColorSave = async(color) => {
  if(!selectedRoutineForColor) return;
  const userIdInt = parseInt(userId);

  try {
    const {data: existing, error: checkError } =await supabase
    .from('routine_colors').select('*').eq('routine_id', selectedRoutineForColor.id)
    .eq('user_id', userIdInt)
    .maybeSingle();

    if(checkError) {
      console.error('Error checking existing color: ', checkError);
      return;
    }

    if (existing) {
       const {error: updateError} = await supabase
    .from('routine_colors')
    .update({color: color})
    .eq('routine_id', selectedRoutineForColor.id)
    .eq('user_id', userIdInt);

    if(updateError) {
      console.error('Error updating color: ', updateError);
      return;
    }
    } else {
      const {error: insertError} = await supabase
      .from('routine_colors')
      .insert([{
        routine_id: selectedRoutineForColor.id,
        user_id: userIdInt, 
        color: color
      }]);

      if(insertError) {
        console.error('Error inserting color: ', insertError);
        return;
      }
    }
    setRoutineColors(prev => ({
      ...prev, 
      [selectedRoutineForColor.id]: color
    }));

    setColorDialogOpen(false);
    console.log(`Color ${color} saved from routine ${selectedRoutineForColor.name}`);
    await refreshCalendarData();
  }
  catch (error) {
    console.error('Error saving routine color:', error);
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
                handleMouseOut, 
                routineColors
              }
            }}

            key={JSON.stringify(routineColors)}
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
         <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
  <DialogTitle>
    <Typography variant="h6" component="div">Schedule a Workout</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
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
            >
              <MenuItem value="">
                <em>No routine</em>
              </MenuItem>
              {routines.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,  width: '100%' }}>
                  <Box 
                  sx={{
                    width: 16, height: 16, borderRadius: '50%',
                    bgcolor: routineColors[option.id] || '#2196f3',
                    border: '1px solid #ccc', 
                    flexShrink: 0
                  }}
                  />
                  <span>
                  {option.name} ({option.details ? option.details.length : 0} exercises)
                </span>
                <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorEdit(option);
                }}
                sx={{ml: 'auto', minWidth: 'auto', p: 0.5}}>
                  Change Color
                </Button></Box>
                </MenuItem>
              ))}
            </TextField>

            {routineId && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Selected Routine: {routines.find(r => r.id == routineId)?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Exercises: {routines.find(r => r.id == routineId)?.details?.join(", ")}
                </Typography>
              </Box>
                                )}
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

        <Dialog 
  open={colorDialogOpen} 
  onClose={() => setColorDialogOpen(false)} 
  maxWidth="xs" 
  fullWidth
  disableRestoreFocus
>
          <DialogTitle>
    Choose Color for "{selectedRoutineForColor?.name}"
  </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, mt: 1 }}>
      {ROUTINE_COLORS.map((color) => (
          <Box
            key={color.value}
            onClick={() => handleColorSave(color.value)}
            sx={{
               width: 60,
            height: 60,
            bgcolor: color.value,
            borderRadius: 1,
            cursor: 'pointer',
            border: routineColors[selectedRoutineForColor?.id] === color.value 
              ? '3px solid #000' 
              : '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              transform: 'scale(1)',
              transition: 'transform 0.2s'
            }, 
            '&:focus': { 
              outline: '2px solid #1976d2',
              outlineOffset: '2px'
            }
          }}
          title={color.name}
          role="button" 
          tabIndex={0} 
          onKeyDown={(e) => { 
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleColorSave(color.value);
            }
          }}
        >
            {routineColors[selectedRoutineForColor?.id] === color.value && (
              <CheckIcon sx={{ fontSize: 20, color: 'white' }} />
            )}
            </Box>
      ))}
      </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setColorDialogOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}



const CustomDay = React.memo(function CustomDay(props) {
  const { day, selected, routines, calendarDates, handleMouseOver, handleMouseOut, routineColors, ...other } = props;
  const selectedRoutineId = selected[getDateKey(day)];
  const routine = routines.find(r => r.id == selectedRoutineId);
  const isInCalendarTable = calendarDates.includes(getDateKey(day));

  const routineColor = routineColors[selectedRoutineId] 
    || routineColors[String(selectedRoutineId)] 
    || routineColors[Number(selectedRoutineId)] 
    || '#2196f3';


  // const routineColor = (() => {
  //   if (!selectedRoutineId) return '#2196f3';

  //   const colorById = routineColors[selectedRoutineId];
  //   const colorByStringId = routineColors[String(selectedRoutineId)];
  
  //   const finalColor = colorById || colorByStringId || '#2196f3';
  //   return finalColor;
  // })();

  // if (selectedRoutineId) {
  //   console.log(`Day ${getDateKey(day)}: routineId=${selectedRoutineId}, color=${routineColor}`);
  // }
  
    if (selectedRoutineId) {
    console.log(`📅 Day ${getDateKey(day)}:`, {
      selectedRoutineId,
      selectedRoutineIdType: typeof selectedRoutineId,
      isInCalendarTable,
      routineColor,
      allRoutineColors: routineColors,
      colorFromNumber: routineColors[Number(selectedRoutineId)],
      colorFromString: routineColors[String(selectedRoutineId)]
    });
  }
  
  
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
            ? `${routineColor} !important`
            : routine 
              ? `${routineColor}40 !important`
              : undefined,
          color: isInCalendarTable ? "white !important" : undefined,
          "&:hover": {
            backgroundColor: isInCalendarTable 
              ? `${routineColor}CC !important`
              : `${routineColor}60 !important`,
          },
        }}
      />
    </div>
    );
}, (prevProps, nextProps) => {
  return (
    prevProps.day.getTime() === nextProps.day.getTime() &&
    prevProps.selected === nextProps.selected &&
    JSON.stringify(prevProps.routineColors) === JSON.stringify(nextProps.routineColors) &&
    prevProps.calendarDates === nextProps.calendarDates
  );
}); 
