import React, { useState, useEffect } from "react"
import { supabase } from '../supabase/supabase-client'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const routines = [
    { id: 1, name: "Leg Day", exnum: 5, details: ["Squats", "Lunges", "Leg Press", "Calf Raises", "Leg Curls"] },
    { id: 2, name: "Strength Training", exnum: 4, details: ["Bench Press", "Deadlift", "Pull Ups", "Shoulder Press"] },
    { id: 3, name: "Cardio", exnum: 3, details: ["Running", "Cycling", "Rowing"] }
];

function GoogleCalendar() {
    const [start, setStart] = useState(new Date());
    const [selected, setSelected] = useState({});
    const [eventName, setEventName] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [routineId, setRoutineId] = useState('');
    
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    useEffect(() => {
        const key = new Date(start).toISOString().slice(0, 10);
        setRoutineId(selected[key] || '');
    }, [start, selected]);

    async function createCalendarEvent(e) {
        e.preventDefault();
        
        if (!eventName) {
            alert("Please select a routine first");
            return;
        }

        const event = {
            'summary': eventName,
            'start': {
                'dateTime': start.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                dateTime: end.toISOString(), // Fixed: changed 'ends' to 'end'
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }

        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session || !session.provider_token) {
                alert("Please login with Google first");
                return;
            }

            const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + session.provider_token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });

            if (response.ok) {
                setDialogOpen(false);
                alert("Event created. Check Google Calendar.");
                setEventName("");
                setRoutineId('');
            } else {
                throw new Error('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating calendar event:', error);
            alert("Error creating event. Please try again.");
        }
    }

    const handleDateChange = (newStart) => {
        setStart(newStart);
        setDialogOpen(true);
    };

    const handleRoutineChange = (e) => {
        const selectedRoutineId = e.target.value;
        setRoutineId(selectedRoutineId);
        
        const routine = routines.find(r => r.id === selectedRoutineId);
        setEventName(routine ? routine.name : "");

        const key = new Date(start).toISOString().slice(0, 10);
        setSelected(prev => ({ ...prev, [key]: selectedRoutineId }));
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ backgroundColor: "white", p: 2, mb: 2, borderRadius: 1 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
                    Google Calendar Integration
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Schedule your workout routines directly to Google Calendar
                </Typography>
            </Box>

            <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateCalendar
                        value={start}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
            </Box>

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        Schedule a Workout
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Assign routine for {start.toLocaleDateString()}
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
                            <em>Select a routine</em>
                        </MenuItem>
                        {routines.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name} ({option.exnum} exercises)
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    {eventName && (
                        <Box sx={{ mt: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Selected Routine: {eventName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Exercises: {routines.find(r => r.id === routineId)?.details.join(", ")}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        onClick={createCalendarEvent}
                        disabled={!eventName}
                    >
                        Create Event
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setDialogOpen(false);
                            setEventName("");
                            setRoutineId('');
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default GoogleCalendar
