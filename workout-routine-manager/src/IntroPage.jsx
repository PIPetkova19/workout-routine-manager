import { Box, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { iconMap } from "./views/theme/Theme";
import Grid from '@mui/material/Grid';

export default function IntroPage() {
    const FitBitIcon = iconMap["FitBit"];

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{ flexGrow: 5 }}>
                            <Box display="flex" alignItems="center">
                                <FitBitIcon />
                                <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                                    Fitness Tracker
                                </Typography>
                            </Box>
                        </Box>

                        <Box >
                            <Button >
                                <Link to="/signIn" style={{ color: "white", textDecoration: "none" }}>
                                    Sign in
                                </Link>
                            </Button>

                            <Button variant="outlined" color="white" sx={{ ml: 1 }}>
                                <Link to="/signUp" style={{ color: "white", textDecoration: "none" }}>
                                    Sign up
                                </Link>
                            </Button>

                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Grid
                container
                direction="row"
                sx={{
                    height: '100%',
                    width: '100%',
                }}>

                <Grid
                    size={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'left',
                        backgroundColor: "#F8FAFC",
                        padding: 10,
                    }}>
                    <Typography variant="h3" component="h2" sx={{ fontWeight: "bold", fontFamily: "Arial", mb: 4 }}>
                        Take control of your fitness journey with our tracker.
                    </Typography>

                    <Typography variant="subtitle1" component="h2">
                        Easily schedule workouts, log your sets and reps, and stay consistent.
                        Track progress with interactive charts and stay motivated with a clear view of your fitness journey.
                    </Typography>
                </Grid>

                <Grid
                    size={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#BCCCDC",
                    }}>
                    <img src="/images/introPagePic.png" alt="Phone" width="300" />
                </Grid>
            </Grid>
        </>
    );
}
