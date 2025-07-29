import { Box, Typography } from "@mui/material";

export default function Routines() {
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
        <Typography variant="h3">Welcome to your Routines!</Typography>
        <Typography variant="subtitle1">
          Create and manage your workout plans.
        </Typography>
      </Box>
    </Box>
  );
}
