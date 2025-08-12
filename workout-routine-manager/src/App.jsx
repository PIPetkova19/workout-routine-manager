import { use, useState } from "react";
import { AuthContext } from "./context/AuthContext"
import "./App.css";
import Dashboard from "./views/Dashboardd";
import Calendar from "./views/CalendarPage";
import Assistant from "./views/Assistant";
import { Routes, Route, Link } from "react-router-dom";
import Routines from "./views/Routines";
import AppSettings from "./views/AppSettings";
import AccSettings from "./views/AccSettings";
import ResetPassword from "./ResetPassword";
import UpdateUser from "./UpdateUser";
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
import IntroPage from "./IntroPage";
import ThemeToggle from "./components/ThemeToggle";

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

  //sign out
  const { handleSignOut } = use(AuthContext);
  const signOut = async () => {
    await handleSignOut();
  }
  const { user } = use(AuthContext);

  return (
    <Box sx={{ display: "flex", minHeight: "100%" }}>
      <CssBaseline />

      {user && (<>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
              {user.user_metadata.iss === "https://accounts.google.com" ?
                (<Link to={"/googleCalendar"}>
                  <CreateListItem iconName="Calendar" text="Google Calendar" />
                </Link>
                ) :
                (<Link to={"/calendar"}>
                  <CreateListItem iconName="Calendar" text="Calendar" />
                </Link>)
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

      <Box
        component="main"
        sx={{
          p: 3,
          width: "100%",
          backgroundColor: "#F0F0F0",
        }}
      >
        <Toolbar />

        <Routes>
          {/*without registration*/}
          <Route path="/" element={<Dashboard />} />
          <Route path="/introPage" element={<IntroPage />} />

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
      </Box>
    </Box>
  );
}
