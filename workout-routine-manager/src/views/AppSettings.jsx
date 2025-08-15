import { Box, Typography, Card, useTheme } from "@mui/material";

export default function AppSettings() {
  const theme = useTheme();
  
  return (
    <Box sx={{ color: theme.palette.text.primary }}>
      <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
        App Settings
      </Typography>
      
      <Card 
        sx={{ 
          p: 3, 
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body1">
          Configure your app preferences and settings here.
        </Typography>
      </Card>
    </Box>
  );
}