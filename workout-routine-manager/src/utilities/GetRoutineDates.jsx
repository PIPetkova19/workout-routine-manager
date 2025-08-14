import { supabase } from "../supabase/supabase-client";
import { useState, useEffect } from "react";

export const GetRountineDate = (type) => {
  const [routineDateError, setRoutineDateFetchError] = useState(null);
  const [routineDateData, setRoutineDateData] = useState(null);

  useEffect(() => {
    const fetchRoutineDate = async () => {
      const { data, error } = await supabase
      .from("routine_date")
      .select();

      if(error){
        setRoutineDateFetchError(error);
        setRoutineDateData(null);
        console.log(error);
      }

      if(data){
        setRoutineDateFetchError(null);
        setRoutineDateData(data);
      }
    };

    fetchRoutineDate();
  }, []);

  return {routineDateError, routineDateData};
}