import { use, useState } from "react";
import { AuthContext } from "./context/AuthContext"
import "./App.css";
import Dashboard from "./views/Dashboardd";
import Calendar from "./calendar/Calendar";
import Assistant from "./views/Assistant";
import { Routes, Route, Link } from "react-router-dom";
import Routines from "./views/Routines";
import AppSettings from "./views/AppSettings";
import AccSettings from "./views/AccSettings";
import ResetPassword from "./registration/ResetPassword";
import UpdateUser from "./registration/UpdateUser";
import SignUp from "./registration/SignUp"
import SignIn from "./registration/SignIn"
import ProtectedRoute from "./ProtectedRoute"
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";

import { CreateListItem, BasicButton, iconMap } from "./views/theme/Theme";
import VerifyUser from "./registration/VerifyUser";
import GoogleCalendar from "./GoogleCalendar";
import ThemeToggle from "./components/ThemeToggle";
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 220;

export default function App() {
  const FitBitIcon = iconMap["FitBit"];
  const MenuIcon = iconMap["Menu"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const [selected, setSelected] = useState({});
<<<<<<< Updated upstream

  //sign out
  const { handleSignOut } = use(AuthContext);
  const signOut = async () => {
    await handleSignOut();
  }

  const { user, isLoading } = use(AuthContext);
  const location = useLocation();
  const isIntroPage = location.pathname === "/";
  
  //spinner
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
        <CircularProgress />
      </Box>
    );
  }

  else {
    return (
      <Box sx={{ display: "flex", minHeight: "100%" }}>
        <CssBaseline />

        {user && (<>
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
=======
  
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
>>>>>>> Stashed changes
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={() => setDrawerOpen((prev) => !prev)}
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
<<<<<<< Updated upstream
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <FitBitIcon />
                <Typography variant="h6" noWrap component="div">
                  Fitness Tracker
                </Typography>
              </Box>
              <ThemeToggle />
              {/*sign out*/}
              <Box sx={{ marginLeft: "auto" }}>
                <Button
                  variant="outlined"
                  onClick={signOut}
                  startIcon={<LogoutIcon />}
                  sx={{
                    color: "white",
                    borderColor: "white"
                  }}
                >
                  {!isSmallScreen && (
                    <>
                      <Typography> Sign out</Typography>
                    </>
                  )}
                </Button>
              </Box>

            </Toolbar>
          </AppBar>
        </>
        )}

        {user && (<>
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >

            <Toolbar />
            <Box onClick={toggleDrawer(false)} sx={{ overflow: "auto" }}>
              <List>
                <Link to={"/"}>
                  <CreateListItem iconName="Dashboard" text="Dashboard" />
                </Link>
                <Link to={"/routines"}>
                  <CreateListItem iconName="Routines" text="Routines" />
                </Link>
                <Link to={"/assistant"}>
                  <CreateListItem iconName="Assistant" text="AI Assistant" />
                </Link>

                {user.user_metadata.iss === "https://accounts.google.com"
                  ?
                  (<Link to={"/googleCalendar"}>
                    <CreateListItem iconName="Calendar" text="Google Calendar" />
                  </Link>
                  )
                  :
                  (<Link to={"/calendar"}>
                    <CreateListItem iconName="Calendar" text="Calendar" />
                  </Link>
                  )
                }
              </List>
            </Box>
            <Box onClick={toggleDrawer(false)} sx={{ mt: "auto" }}>
              <Divider />
              <List sx={{ display: "flex", justifyContent: "center" }}>
                <Link to={"/accsettings"}>
                  <BasicButton iconName="Account" />
                </Link>
                <Link to={"/appsettings"}>
                  <BasicButton iconName="Settings" />
                </Link>
              </List>
            </Box>
          </Drawer>
        </>
        )}

        {/*change color of background for intro page and the other pages*/}
=======
              <FitBitIcon sx={{ color: theme.palette.primary.main }} />
              <Typography variant="h6" noWrap component="div" sx={{ ml: 1, color: theme.palette.text.primary }}>
                Fitness Tracker
              </Typography>
            </Box>
            <ThemeToggle />
          </Toolbar>
        </AppBar>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Toolbar />
          <Box onClick={toggleDrawer(false)} sx={{ overflow: "auto" }}>
            <List>
              <Link to={"/"} style={{ textDecoration: 'none' }}>
                <CreateListItem iconName="Dashboard" text="Dashboard" />
              </Link>
              <Link to={"/routines"} style={{ textDecoration: 'none' }}>
                <CreateListItem iconName="Routines" text="Routines" />
              </Link>
              <Link to={"/calendar"} style={{ textDecoration: 'none' }}>
                <CreateListItem iconName="Calendar" text="Calendar" />
              </Link>
              <Link to={"/assistant"} style={{ textDecoration: 'none' }}>
                <CreateListItem iconName="Assistant" text="AI Assistant" />
              </Link>
            </List>
          </Box>
          <Box onClick={toggleDrawer(false)} sx={{ mt: "auto" }}>
            <Divider />
            <List sx={{ display: "flex", justifyContent: "center" }}>
              <Link to={"/accsettings"} style={{ textDecoration: 'none' }}>
                <BasicButton iconName="Account" />
              </Link>
              <Link to={"/appsettings"} style={{ textDecoration: 'none' }}>
                <BasicButton iconName="Settings" />
              </Link>
            </List>
          </Box>
        </Drawer>
>>>>>>> Stashed changes
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
<<<<<<< Updated upstream
            width: "100%",
            backgroundColor:
              isIntroPage
                ? (user ? theme.palette.background.dashboard : theme.customShadows.background)
                : theme.palette.background.main,
          }}
        >
          <Toolbar />

          <Routes>
            {/*without registration*/}
            <Route path="/" element={<Dashboard />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/updateUser" element={<UpdateUser />} />
            <Route path="/verifyUser" element={<VerifyUser />} />

            {/*with registration*/}
            <Route path="/routines" element={
              <ProtectedRoute>
                <Routines />
              </ProtectedRoute>
            } />

            <Route path="/calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />

            <Route path="/googleCalendar" element={
              <ProtectedRoute>
                <GoogleCalendar />
              </ProtectedRoute>
            } />

            <Route path="/assistant" element={
              <ProtectedRoute>
                <Assistant />
              </ProtectedRoute>
            } />

            <Route path="/appsettings" element={
              <ProtectedRoute>
                <AppSettings />
              </ProtectedRoute>
            } />

            <Route path="/accsettings" element={
              <ProtectedRoute>
                <AccSettings />
              </ProtectedRoute>
            } />

          </Routes>
=======
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Toolbar />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/routines" element={<Routines />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/appsettings" element={<AppSettings />} />
              <Route path="/accsettings" element={<AccSettings />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/updateUser" element={<UpdateUser />} />
              <Route path="/verifyUser" element={<VerifyUser />} />
            </Routes>
          </AuthProvider>
>>>>>>> Stashed changes
        </Box>
      </Box>
    );
  }
}
