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
