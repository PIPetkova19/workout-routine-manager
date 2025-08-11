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
            {/*navbar*/}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{
                    boxShadow: "none",
                    borderBottom: "none",
                    backgroundColor: "#e1ecf8cc",
                    backdropFilter: "blur(10px)"
                }}>
                    <Toolbar sx={{
                        position: "sticky",
                        top: 0,
                        overflow: "hidden"
                    }}>
                        <Box sx={{ flexGrow: 5 }}>
                            <Box display="flex" alignItems="center">
                                {/*icon*/}
                                <FitBitIcon
                                    fontSize="medium"
                                    sx={{ color: "#1976d2" }}
                                />
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        ml: 1,
                                        color: "#1976d2",
                                        fontWeight: "bold"
                                    }}>
                                    FT
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Button
                                variant="outlined"
                                component={Link}
                                to="/signIn"
                                sx={{
                                    textDecoration: "none",
                                    borderRadius: "8px",
                                    "&:hover": {
                                        backgroundColor: "#e1ecf8ff",
                                    }
                                }}
                            >
                                Sign in
                            </Button>

                            <Button
                                variant="contained"
                                component={Link}
                                to="/signUp"
                                sx={{
                                    ml: 1,
                                    backgroundColor: "#1976d2",
                                    color: "white",
                                    borderRadius: "8px",
                                    "&:hover": {
                                        backgroundColor: "#1865b3ff",
                                        color: "white"
                                    }
                                }}
                            >
                                Sign up
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Grid
                container
                spacing={15}
                direction="column"
                sx={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: "#e1ecf8ff",
                }}>

                {/*text*/}
                <Grid
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: 10,
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                    }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontWeight: "bold",
                            fontFamily: "Arial",
                            mb: 4
                        }}>

                        <Box sx={{ textAlign: "center" }}>
                            <FitBitIcon sx={{ fontSize: 60, color: "#1976d2" }} />
                        </Box>

                        <Box> Take control of your fitness </Box>
                        <Box sx={{ color: "#1976d2" }}>journey with our tracker</Box>
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{
                            mb: 4,
                            textTransform: "uppercase"
                        }}>
                        <Grid container spacing={2}>
                            <Grid>   Easily schedule workouts</Grid>
                            <Grid> log your sets and reps</Grid>
                            <Grid>  stay consistent</Grid>
                        </Grid>
                    </Typography>

                    <Box>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/signUp"
                            sx={{
                                ml: 1,
                                backgroundColor: "#1976d2",
                                color: "white",
                                borderRadius: "20px",
                                "&:hover": {
                                    backgroundColor: "#1865b3ff",
                                    color: "white"
                                }
                            }}
                        >
                            Sign up
                        </Button>
                    </Box>
                </Grid>

                {/*pic*/}
                <Grid xs={8}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        minHeight: '400px',
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                    }}>
                    <Box sx={{
                        background: "linear-gradient(90deg, rgba(25, 118, 210, 0.83) 0%, rgba(25, 167, 210, 0.69) 50%, rgba(25, 118, 210, 0.74) 100%)",
                        paddingLeft: 30,
                        paddingRight: 30,
                        paddingBottom: 5,
                        paddingTop: 10,
                        backdropFilter: "blur(10px)"
                    }}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ mb: 4 }}>
                            Designed to adapt perfectly to both mobile and desktop screens, ensuring ease of use everywhere.
                        </Typography>
                        <img src="/images/tabletPhone.png" alt="Tablet"
                         style={{ maxWidth: "100%", height: "auto" }} />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
