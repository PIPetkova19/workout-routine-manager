import { useState, useEffect } from "react"
import { supabase } from "./supabase/supabase-client.js";
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
    //selected date
    const [start, setStart] = useState(new Date());
    //all dates
    const [selected, setSelected] = useState({});
    const [eventName, setEventName] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [routineId, setRoutineId] = useState('');
    //1 hour
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    useEffect(() => {
        const key = new Date(start).toISOString().slice(0, 10);
        setRoutineId(selected[key] || '');
    }, [start, selected]);

    async function createCalendarEvent(e) {
        e.preventDefault();
        const event = {
            'summary': eventName,
            'start': {
                'dateTime': start.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            //end is mandatory
            'end': {
                dateTime: end.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }

        const { data: { session } } = await supabase.auth.getSession();
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + session.provider_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        }).then((data) => {
            return data.json();
        }).then(() => {
            setDialogOpen(false);
            alert("Event created. Check Google Calendar.");
        })
    }

    const handleDateChange = (newStart) => {
        setStart(newStart);
        setDialogOpen(true);
    };

    const handleRoutineChange = (e) => {
        setRoutineId(e.target.value);
        switch (e.target.value) {
            case 1: setEventName("Leg Day"); break;
            case 2: setEventName("Strength Training"); break;
            case 3: setEventName("Cardio"); break;
            default: setEventName("");
        }

        const key = new Date(start).toISOString().slice(0, 10);
        setSelected(prev => ({ ...prev, [key]: e.target.value }));
    };

    return (
        <>
            <Box sx={{ backgroundColor: "white", mb: 2 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                    Workout Calendar
                    <Typography variant="h6" component="div">
                        Schedule your routine and track completed workout
                    </Typography>
                </Typography>
            </Box>

            <Box sx={{ backgroundColor: "white" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateCalendar
                        value={start.toISOString()}
                        onChange={handleDateChange} />
                </LocalizationProvider>
            </Box>

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}>
                <DialogTitle>
                    <Typography variant="h6" component="p">
                        Schedule a Workout
                    </Typography>
                    <Typography variant="h6" component="p">
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
                        sx={{ mt: 2 }}>
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
                        onClick={(e) => createCalendarEvent(e)} >
                        Save
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => setDialogOpen(false)}   >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default GoogleCalendar
