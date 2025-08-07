import { supabase } from "../supabase/supabase-client";
import { useState, useEffect } from "react";
import { CreateCard } from "../views/theme/Theme";
import { calculateDifference, calculateStreak, calculateWorkouts, streakSubtext } from "./helperFunctions";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const currentDay = new Date().getDate();

export const GetFromCalendar = (type) => {
  const [fetchError, setFetchError] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const [count, setCount] = useState(0);
  const [difference, setDifference] = useState(0);
  const [streak, setStreak] = useState(0);

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
        
        let currentStreak = calculateStreak(data, currentMonth, currentYear, 9);
        let currentAmount = calculateWorkouts(data, currentMonth);

        setCount(currentAmount);
        setStreak(currentStreak);
        setDifference(calculateDifference(data, currentAmount, currentYear, currentMonth));
      }
    };
    
    fetchCalendar();
  }, []);

  if (type === "workoutCount"){
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
  } else if (type === "currentStreak"){
    return (
    <>
      {fetchError && (<CreateCard
                      text={"Current Streak"}
                      data={``}
                      subText={`${fetchError}`}
                    />)}
        {calendar && (<CreateCard
                      text={"Current Streak"}
                      data={`${streak} days`}
                      subText={`${streakSubtext(streak)}`}
                    />)}
    </>
    );
  }
};
