import { Box, Typography, Grid} from "@mui/material";
import { BarsDataset, CreateCard } from "./theme/Theme";
import { fitnessData } from "../dataMockUp/data";

const currentMonth = new Date().getMonth();
const dataToShow = [ { dataKey: "workoutFrequency", label: "workoutFrequency", color: "#1976d2"},];

export default function Dashboard() {
  return (
    <Box>
        <Box sx={{ 
            backgroundColor: "white",
            borderRadius: 2,
            mb: 2,
            justifyContent: "left",
            alignItems: "left"
          }}>
            <Typography variant="h3">
                Welcome to your Dashboard!
            </Typography>
            <Typography variant="subtitle1">
                Here's your progress overview.
            </Typography>
        </Box>
        <Box>
            <Grid container spacing={2} >
                <Grid size={3}>
                    <CreateCard text={"Workouts This Month"} data={`${fitnessData[currentMonth].workoutsThisMonth}`}/>
                </Grid>
                <Grid size={3}>
                    <CreateCard text={"Current Streak"} data={`${fitnessData[currentMonth].currentStreak} days`}/>
                </Grid>
                <Grid size={3}>
                    <CreateCard text={"Total Volume Lifted"} data={`${fitnessData[currentMonth].totalVolumeLifted} kg`}/>
                </Grid>
                <Grid size={3}>
                    <CreateCard text={"Active This Week"} data={`+${fitnessData[currentMonth].activeThisWeek}`}/>
                </Grid>
                <Grid size={12}>
                    <BarsDataset  data={fitnessData} toShow={dataToShow} keyProp="month" name="Your Workout Frequency"/>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
            </Grid>
        </Box>
    </Box>
  );
}
