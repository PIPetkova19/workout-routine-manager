import { supabase } from "../supabase/supabase-client";
import { useState, useEffect } from "react";

export const GetRountines = (type) => {
  const [routinesError, setRoutinesFetchError] = useState(null);
  const [routinesData, setRoutinesData] = useState(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      const { data, error } = await supabase
      .from("routines")
      .select();

      if(error){
        setRoutinesFetchError(error);
        setRoutinesData(null);
        console.log(error);
      }

      if(data){
        setRoutinesFetchError(null);
        setRoutinesData(data);
      }
    };

    fetchRoutines();
  }, []);

  return {routinesError, routinesData};
}