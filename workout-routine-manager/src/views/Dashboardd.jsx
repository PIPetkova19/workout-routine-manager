import { Box, Typography, Grid } from "@mui/material";
import { BarsDataset, CreateCard } from "./theme/Theme";
import { fitnessData } from "../dataMockUp/data";

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
console.log(currentYear);

const dataToShow = [
  { dataKey: "workoutFrequency", label: "workoutFrequency", color: "#1976d2" },
];
const workoutsDifference = calculateDifference(fitnessData, currentMonth, currentYear);
const streakSubtext = streaks(fitnessData[currentYear][currentMonth].currentStreak);

export default function Dashboard() {
  return (
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
          <Grid size={3}>
            <CreateCard
              text={"Workouts This Month"}
              data={`${fitnessData[currentYear][currentMonth].workoutsThisMonth}`}
              subText={workoutsDifference}
            />
          </Grid>
          <Grid size={3}>
            <CreateCard
              text={"Current Streak"}
              data={`${fitnessData[currentYear][currentMonth].currentStreak} days`}
              subText={streakSubtext}
            />
          </Grid>
          <Grid size={3}>
            <CreateCard
              text={"Total Volume Lifted"}
              data={`${fitnessData[currentYear][currentMonth].totalVolumeLifted} kg`}
              subText={"This Month"}
            />
          </Grid>
          <Grid size={3}>
            <CreateCard
              text={"Active This Week"}
              data={`+${fitnessData[currentYear][currentMonth].activeThisWeek}`}
              subText={"Workouts logged"}
            />
          </Grid>
          <Grid size={12}>
            <BarsDataset
              data={fitnessData[currentYear]}
              toShow={dataToShow}
              keyProp="month"
              name="Your Workout Frequency"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}></Grid>
      </Box>
    </Box>
  );
}

function calculateDifference(fitnessData, currentMonth, currentYear) {
  let currentAmount = fitnessData[currentYear][currentMonth].workoutsThisMonth;
  let previousAmount;
  if (currentMonth === 0) {
    if (fitnessData[currentYear - 1] === undefined) return 'No data from previous year to compare';
    previousAmount = fitnessData[currentYear - 1][11].workoutsThisMonth;
  } else {
    previousAmount = fitnessData[currentYear][currentMonth - 1].workoutsThisMonth;
  }

  if (currentAmount < previousAmount) {
    return `You've done ${previousAmount - currentAmount} workouts less than last Month`;
  } else if (currentAmount > previousAmount) {
    return `You've done ${currentAmount - previousAmount} workouts more than last Month`;
  } else if (currentAmount === previousAmount) {
    return "You've done the same amount as last Month";
  } else if (currentAmount === undefined || previousAmount === undefined) {
    return "Insufficient data to compare workouts.";
  }
}

function streaks(data){
    if(data === 0){
        return "C'mon you can do this!";
    } else if (data > 0 && data <= 3){
        return "Keep it up!";
    } else if (data > 3 && data <= 6){
        return "You're doing great!";
    } else if (data > 6 && data <= 9) {
        return "You're killing it!"
    } else if (data > 9){
        return "YOU'RE ON FIIIRE!"
    }
}