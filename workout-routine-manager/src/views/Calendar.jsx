import { Box, Typography } from "@mui/material";

export default function Calendar() {
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
        <Typography variant="h3">Welcome to your Workout Calendar</Typography>
        <Typography variant="subtitle1">
          Schedule your routines and track completed workouts.
        </Typography>
      </Box>
    </Box>
  );
}
