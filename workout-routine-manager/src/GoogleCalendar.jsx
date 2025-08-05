import { useState } from "react"
import { useSession } from "next-auth/react"

function GoogleCalendar() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const session = useSession();

    async function createCalendarEvent(e) {
        e.preventDefault();
        const event = {
            'summary': eventName,
            'description': eventDesc,
            'start': {
                'dateTime': start.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + session.provider_token
            },
            body: JSON.stringify(event)
        }).then((data) => {
            return data.json();
        }).then(() => {
            alert("Event created. Check Google Calendar.");
        })
    }

    return (
        <>
        {
            session ?  <form>
                <label htmlFor="startDate">Start date:</label>
                <input type="date"
                    id="startDate"
                    name="startDate"
                    value={start}
                    onChange={(e) => setStart(e.target.value)} /><br></br>

                <label htmlFor="endDate">End date:</label>
                <input type="date"
                    id="endDate"
                    name="endDate"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)} /><br></br>

                <label htmlFor="eventName">Event name:</label>
                <input type="text"
                    id="eventName"
                    name="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)} /><br></br>

                <label htmlFor="eventDesc">Event description:</label>
                <input type="text"
                    id="eventDesc"
                    name="eventDesc"
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)} /><br></br>
                <button onClick={(e) => createCalendarEvent(e)}>Add to Google Calendar</button>
            </form>
            : <>no</>
        }
           
        </>
    )
}

export default GoogleCalendar
