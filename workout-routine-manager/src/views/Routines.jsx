<<<<<<< Updated upstream
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
=======
import { Box, Typography, Card, useTheme } from "@mui/material";

export default function Routines(){
    const theme = useTheme();
    
    return (
        <Box sx={{ color: theme.palette.text.primary }}>
            <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                Routines
            </Typography>
            <Card sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
                <Typography variant="body1">
                    Manage your workout routines here!
                </Typography>
            </Card>
        </Box>
    )
}
>>>>>>> Stashed changes
