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
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{
                    boxShadow: "none",
                    borderBottom: "none",
                    backgroundColor: theme.customShadows.background,
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
                                    sx={{ color: theme.customShadows.text.primary }}
                                />
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        ml: 1,
                                        color: theme.customShadows.text.primary,
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
                                        backgroundColor: theme.customShadows.background,
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
                                    backgroundColor: theme.customShadows.text.primary,
                                    color: "white",
                                    borderRadius: "8px",
                                    "&:hover": {
                                        backgroundColor: theme.customShadows.text.secondary,
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
                    backgroundColor: theme.customShadows.background,
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
                            <FitBitIcon sx={{ fontSize: 60, color: theme.customShadows.text.primary }} />
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
                        variant="subtitle1"
                        component="h2"
                        sx={{
                            mb: 4,
                            textTransform: "uppercase"
                        }}>
                        <Grid container spacing={2}
                            sx={{
                                color: theme.customShadows.primary
                            }}>
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
                                backgroundColor: theme.customShadows.text.primary,
                                color: "white",
                                borderRadius: "20px",
                                "&:hover": {
                                    backgroundColor: theme.customShadows.text.secondary,
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
                            sx={{
                                mb: 4,
                                color: theme.customShadows.secondary
                            }}>
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
