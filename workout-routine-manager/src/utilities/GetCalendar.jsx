import { supabase } from "../supabase/supabase-client";
import { useState, useEffect } from "react";

export const GetCalendar = () => {
  const [calendarError, setCalendarFetchError] = useState(null);
  const [calendarData, setCalendarData] = useState(null);

  useEffect(() => {
    const fetchCalendar = async () => {
      const { data, error } = await supabase
      .from("calendar")
      .select();

      if (error) {
        setCalendarFetchError("Could not fetch the calendar");
        setCalendarData(null);
        setCount(0);
        console.log(error);
      }

      if (data) {
        setCalendarData(data);
        setCalendarFetchError(null);
      }
    };
    
    fetchCalendar();
  }, []);

  return {calendarError, calendarData}
};