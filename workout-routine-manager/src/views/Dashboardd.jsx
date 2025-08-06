<<<<<<< Updated upstream
import { Box, Typography } from "@mui/material";
import { CreateCard } from "./theme/Theme";
import { fitnessData } from "../dataMockUp/data";
=======
import { Box, Card, List, Typography, useTheme } from "@mui/material";
>>>>>>> Stashed changes

export default function Dashboard() {
  const theme = useTheme();
  
  return (
<<<<<<< Updated upstream
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
        <Box sx={{ display: "flex" }}>
            <CreateCard text={`Workouts This Month`} data={`${fitnessData.January.workoutsThisMonth}`}/>
            <CreateCard text={`Current Streak`} data={`${fitnessData.January.currentStreak} days`}/>
            <CreateCard text={`Total Volume Lifted`} data={`${fitnessData.January.totalVolumeLifted} kg`}/>
            <CreateCard text={`Active This Week`} data={`+${fitnessData.January.activeThisWeek}`}/>
        </Box>
=======
    <Box sx={{ color: theme.palette.text.primary }}>
      <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      <Card sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
        <Typography variant="body1">
          Welcome to your Fitness Tracker Dashboard!
        </Typography>
      </Card>
>>>>>>> Stashed changes
    </Box>
  );
}
