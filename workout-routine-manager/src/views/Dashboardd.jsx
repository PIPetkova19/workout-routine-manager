import { Box, Typography, Grid } from "@mui/material";
import { BarsDataset, CreateCard } from "./theme/Theme";
import { fitnessData } from "../dataMockUp/data";
import { streaks } from "../utilities/helperFunctions";
import { GetCalendar } from "../utilities/data";

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const dataToShow = [
  { dataKey: "workoutFrequency", label: "workoutFrequency", color: "#1976d2" },
];
const streakSubtext = streaks(fitnessData[currentYear][currentMonth].currentStreak);

export default function Dashboard() {
  let calendar = GetCalendar();
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
          <Grid size={{ xs: 12, md: 3 }}>
            {calendar}
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <CreateCard
              text={"Current Streak"}
              data={`${fitnessData[currentYear][currentMonth].currentStreak} days`}
              subText={streakSubtext}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <CreateCard
              text={"Total Volume Lifted"}
              data={`${fitnessData[currentYear][currentMonth].totalVolumeLifted} kg`}
              subText={"This Month"}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
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