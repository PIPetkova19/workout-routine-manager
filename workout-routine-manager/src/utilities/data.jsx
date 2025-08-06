import { supabase } from "../supabase/supabase-client";
import { useState, useEffect } from "react";
import { CreateCard } from "../views/theme/Theme";
import { calculateDifference, calculateWorkouts } from "./helperFunctions";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

export const GetCalendar = (type) => {
  const [fetchError, setFetchError] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const [count, setCount] = useState(0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    const fetchCalendar = async () => {
      const { data, error } = await supabase
      .from("calendar")
      .select();

      if (error) {
        setFetchError("Could not fetch the calendar");
        setCalendar(null);
        setCount(0);
        console.log(error);
      }

      if (data) {
        setCalendar(data);
        setFetchError(null);
        let currentAmount = calculateWorkouts(data, currentMonth);
        setCount(currentAmount);
        setDifference(calculateDifference(data, currentAmount, currentYear, currentMonth));
      }
    };
    
    fetchCalendar();
  }, []);
  return (
    <>
      {fetchError && (<CreateCard
                      text={"Workouts This Month"}
                      data={``}
                      subText={`${fetchError}`}
                    />)}
        {calendar && (<CreateCard
                      text={"Workouts This Month"}
                      data={`${count}`}
                      subText={`${difference}`}
                    />)}
    </>
  );
};
