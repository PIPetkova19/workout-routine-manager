import { Box, Typography } from "@mui/material";

export default function Assistant() {
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
        <Typography variant="h3">Welcome to Assistant!</Typography>
        <Typography variant="subtitle1">
          Your new best friend!
        </Typography>
      </Box>
    </Box>
  );
}
