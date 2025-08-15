import { Box, Typography, Card, useTheme } from "@mui/material";

export default function Assistant() {
  const theme = useTheme();
  
  return (
    <Box sx={{ color: theme.palette.text.primary }}>
      <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
        AI Assistant
      </Typography>
      
      <Card 
        sx={{ 
          p: 3, 
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Welcome to Assistant!
        </Typography>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
          Your new best friend for fitness guidance!
        </Typography>
      </Card>
    </Box>
  );
}
