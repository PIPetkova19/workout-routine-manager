import { Box, Typography, Grid, useTheme } from "@mui/material";
import { BarsDataset, CreateCard } from "./theme/Theme";
import { GetCalendar } from "../utilities/GetCalendar";
import { GetRountines } from "../utilities/GetRoutines";
import { calculateAndSetWorkoutFrequencyData, calculateDifference, calculateStreak, calculateTotalVolumeLifted, calculateWeekActivity, calculateWorkoutsThisMonth, setStreakSubtext } from "../utilities/helperFunctions";
import { GetRountineDate } from "../utilities/GetRoutineDates";
import { AuthContext } from "../context/AuthContext";
import { use } from 'react';
import IntroPage from "../IntroPage";

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentDay = new Date().getDate();
let currentDate = new Date();

const dataToShow = [
  { dataKey: "workoutFrequency", label: "workoutFrequency", color: "#1976d2" },
];

export default function Dashboard() {
  const { user } = use(AuthContext);
  const theme = useTheme();

  const { calendarError, calendarData } = GetCalendar();
  const { routinesError, routinesData } = GetRountines();
  const { routineDateError, routineDateData } = GetRountineDate();

  //variables
  let workoutsAmount, amountDifference, currentStreak, streakSubtext, totalVolumeLifted, activeThisWeek
  //helperArrays & Objects
  let routineDateDataCopy = [];
  let dataset = [];
  let exThisMonth = {
    calendar: [],
    exercises: [],
    exId: [],
  }

  if (routineDateData && Array.isArray(routineDateData)){
    routineDateDataCopy = [...routineDateData];
  }
  
  if (calendarData && Array.isArray(calendarData)) {
    workoutsAmount = calculateWorkoutsThisMonth(calendarData, currentDate);
    dataset = calculateAndSetWorkoutFrequencyData(calendarData, currentDate);
    amountDifference = calculateDifference(calendarData, workoutsAmount, currentYear, currentMonth);
    currentStreak = calculateStreak(calendarData, currentMonth, currentYear, currentDay);
    streakSubtext = setStreakSubtext(currentStreak);
    activeThisWeek = calculateWeekActivity(currentDate, calendarData);
    
    calendarData.forEach(element => {
      const month = new Date(element.date).getMonth();
      const day = new Date(element.date).getDate();

      routineDateDataCopy.forEach(routineDates => {
        if(element.id === routineDates.date_id && month === currentMonth && day <= currentDay){
          exThisMonth.calendar.push(element);
        }
      });
    })
  }
  
  if(routinesData && Array.isArray(routinesData)) {
    const processedPairs = new Set();

    exThisMonth.calendar.forEach(calEl => {
      routinesData.forEach(rDataEl=> {
        routineDateDataCopy.forEach(rDatesDataEl => {
          const pairKey = `${calEl.id}-${rDataEl.id}`
          if(rDataEl.id === rDatesDataEl.routine_id && calEl.id === rDatesDataEl.date_id && !processedPairs.has(pairKey)){
            processedPairs.add(pairKey);
            rDataEl.exercise.forEach(exEl => {
              if(exEl.weight){
                exThisMonth.exercises.push(exEl);
                exThisMonth.exId.push(rDataEl.id);
              }
            });
          }
        });
      });
    });
    totalVolumeLifted = calculateTotalVolumeLifted(exThisMonth.exercises);
  }

  return (
     user ?
     <>
    <Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          mb: 2,
          justifyContent: "left",
          alignItems: "left",
        }}
      >
        <Typography variant="h3">Welcome to your Dashboard!</Typography>
        <Typography variant="subtitle1">
          Here's your progress overview.
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            {calendarError && (
              <CreateCard
                text={"Workouts This Month"}
                data={``}
                subText={`Couldn't load the calendar`}
              />
            )}
            {calendarData && Array.isArray(calendarData) && (
              <CreateCard
                text={"Workouts This Month"}
                data={`${workoutsAmount}`}
                subText={`${amountDifference}`}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            {calendarError && (
              <CreateCard
                text={"Current Streak"}
                data={``}
                subText={`Couldn't load the calendar`}
              />)}
            {calendarData && (
              <CreateCard
                text={"Current Streak"}
                data={`${currentStreak} days`}
                subText={`${streakSubtext}`}
              />)}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            {routinesError && routineDateError && (
              <CreateCard
                text={"Total Volume Lifted"}
                data={``}
                subText={`${routinesError}`}
              />)}
            {routinesData && routineDateData && (
              <CreateCard
                text={"Total Volume Lifted"}
                data={`${totalVolumeLifted} kg`}
                subText={"This Month"}
              />)}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <CreateCard
              text={"Active This Week"}
              data={`+${activeThisWeek}`}
              subText={"Workouts logged"}
            />
          </Grid>
          <Grid size={12}>
            <BarsDataset
              data={dataset}
              toShow={dataToShow}
              keyProp="month"
              name="Your Monthly Workout Frequency"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}></Grid>
      </Box>
    </Box>
    </>
    :
      <>
        {/*if user is logged out*/}
        <IntroPage />
      </>
  );
}