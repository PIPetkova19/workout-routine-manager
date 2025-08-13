import { Box, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { iconMap } from "./views/theme/Theme";
import Grid from '@mui/material/Grid';
import { useTheme } from "@mui/material/styles";

export default function IntroPage() {
    const theme = useTheme();
    const FitBitIcon = iconMap["FitBit"];

    return (
        <>
            {/*navbar*/}
            <Box >
                <AppBar
                    sx={{
                        boxShadow: "none",
                        borderBottom: "none",
                        backgroundColor: theme.customShadows.background,
                        backdropFilter: "blur(10px)"
                    }}>
                    <Toolbar
                        sx={{
                            position: "sticky",
                            top: 0,
                            overflow: "hidden"
                        }}>
                        <Box sx={{ flexGrow: 5 }}>
                            <Box display="flex" alignItems="center">
                                {/*icon*/}
                                <FitBitIcon
                                    sx={{
                                        color: theme.customShadows.text.primary
                                    }} />
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        ml: 1,
                                        fontFamily: "Darker Grotesque",
                                        background: "linear-gradient(90deg,rgba(11, 64, 117, 1) 0%, rgba(19, 133, 168, 1) 50%, rgba(25, 118, 210, 1) 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent"
                                    }}>
                                    Fitness Tracker
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
                                    fontSize: {
                                       xs: '0.6rem',
                                        sm: '0.8rem',
                                        md: '0.8rem',
                                        lg: '1rem',
                                        xl: '1rem',
                                    },
                                    "&:hover": {
                                        backgroundColor: theme.customShadows.background,
                                    }
                                }} >
                                Sign in
                            </Button>

                            <Button
                                variant="contained"
                                component={Link}
                                to="/signUp"
                                sx={{
                                    ml: 1,
                                    backgroundColor: theme.customShadows.text.primary,
                                    color: "white",
                                    borderRadius: "8px",
                                    fontSize: {
                                        xs: '0.6rem',
                                        sm: '0.8rem',
                                        md: '0.8rem',
                                        lg: '1rem',
                                        xl: '1rem',
                                    },
                                    "&:hover": {
                                        backgroundColor: theme.customShadows.text.secondary,
                                        color: "white"
                                    }
                                }}>
                                Sign up
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Grid
                container
                spacing={5}
                sx={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: theme.customShadows.background,
                }}>

                {/*text*/}
                <Grid
                    size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
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
                            mb: 4,
                            fontFamily: "Albert Sans",
                            fontSize: {
                                xs: '2rem',
                                sm: '3rem',
                                md: '3.2rem',
                                lg: '3.5rem',
                                xl: '4rem',
                            },
                        }}>

                        <Box sx={{ textAlign: "center" }}>
                            <FitBitIcon
                                sx={{
                                    fontSize: {
                                        xs: '30px',
                                        sm: '50px',
                                        md: '50px',
                                        lg: '50px',
                                        xl: '60px',
                                    },
                                    color: theme.customShadows.text.primary
                                }} />
                        </Box>

                        <Box
                            sx={{
                                color: theme.customShadows.primary
                            }}>
                            Take control of your fitness
                        </Box>
                        <Box
                            sx={{
                                color: theme.customShadows.text.primary
                            }}>
                            journey with our tracker
                        </Box>
                    </Typography>

                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            mb: 4,
                            textTransform: "uppercase",
                            fontSize: {
                                xs: '0.8rem',
                                sm: '1.2rem',
                                md: '1.2rem',
                                lg: '1.2rem',
                                xl: '1.5rem',
                            },
                        }}>
                        <Box
                            sx={{
                                color: theme.customShadows.primary,
                                fontFamily: "Darker Grotesque",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center"
                            }}>
                            Easily schedule workouts • log your sets and reps • stay consistent
                        </Box>
                    </Typography>

                    <Box>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/signUp"
                            sx={{
                                ml: 1,
                                backgroundColor: theme.customShadows.text.primary,
                                color: "white",
                                borderRadius: "20px",
                                fontSize: {
                                    xs: '0.6rem',
                                    sm: '0.8rem',
                                    md: '0.8rem',
                                    lg: '1rem',
                                    xl: '1.2rem',
                                },
                                "&:hover": {
                                    backgroundColor: theme.customShadows.text.secondary,
                                    color: "white"
                                }
                            }}>
                            Sign up
                        </Button>
                    </Box>
                </Grid>

                {/*pic*/}
                <Grid size={{ xs: 12, sm: 12 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        minHeight: '200px',
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                    }}>
                    <Box sx={{
                        background: "linear-gradient(90deg, rgba(25, 118, 210, 0.83) 0%, rgba(25, 167, 210, 0.69) 50%, rgba(25, 118, 210, 0.74) 100%)",
                        padding: {
                            xs: '10px 20px',
                            sm: '20px 50px',
                            md: '20px 60px',
                            lg: '35px 100px',
                            xl: '50px 100px'
                        },
                        backdropFilter: "blur(10px)"
                    }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                fontSize: {
                                    xs: '1rem',
                                    sm: '1.2rem',
                                    md: '1.3rem',
                                    lg: '1.5rem',
                                    xl: '1.5rem',
                                },
                                mb: 4,
                                color: theme.customShadows.secondary,
                                fontFamily: "Darker Grotesque"
                            }} >
                            Designed to adapt perfectly to both mobile and desktop screens, ensuring ease of use everywhere.
                        </Typography>
                        <img src="/images/tabletPhone.png" alt="Tablet"
                            style={{ maxWidth: "100%", height: "auto" }} />
                    </Box>
                </Grid>
            </Grid >
        </>
    );
}
