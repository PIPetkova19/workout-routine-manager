import { Box, Typography } from "@mui/material";
import { CreateCard } from "./theme/Theme";
import { fitnessData } from "../dataMockUp/data";

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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <CreateCard text={`Workouts This Month`} data={`${fitnessData.January.workoutsThisMonth}`}/>
            <CreateCard text={`Current Streak`} data={`${fitnessData.January.currentStreak} days`}/>
            <CreateCard text={`Total Volume Lifted`} data={`${fitnessData.January.totalVolumeLifted} kg`}/>
            <CreateCard text={`Active This Week`} data={`+${fitnessData.January.activeThisWeek}`}/>
        </Box>
    </Box>
  );
}
