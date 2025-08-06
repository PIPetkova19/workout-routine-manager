import { Box, Card, List, Typography, useTheme } from "@mui/material";

export default function Dashboard() {
  const theme = useTheme();
  
  return (
    <Box sx={{ color: theme.palette.text.primary }}>
      <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      <Card sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
        <Typography variant="body1">
          Welcome to your Fitness Tracker Dashboard!
        </Typography>
      </Card>
    </Box>
  );
}
