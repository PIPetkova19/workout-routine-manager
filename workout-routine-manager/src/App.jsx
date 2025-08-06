import { useState } from "react";
import AuthProvider from "./context/AuthContext"
import "./App.css";
import Dashboard from "./views/Dashboardd";
import Calendar from "./views/CalendarPage";
import Assistant from "./views/Assistant";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Routines from "./views/Routines";
import AppSettings from "./views/AppSettings";
import AccSettings from "./views/AccSettings";
import ResetPassword from "./registration/ResetPassword";
import UpdateUser from "./registration/UpdateUser";
import SignUp from "./registration/SignUp"
import SignIn from "./registration/SignIn"
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
import ThemeToggle from "./components/ThemeToggle";

const drawerWidth = 220;

export default function App() {
  const FitBitIcon = iconMap["FitBit"];
  const MenuIcon = iconMap["Menu"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const [selected, setSelected] = useState({});
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", minHeight: "100%" }}>
        <CssBaseline />
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={() => setDrawerOpen((prev) => !prev)}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <FitBitIcon />
              <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
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
              <Link to={"/calendar"}>
                <CreateListItem iconName="Calendar" text="Calendar" />
              </Link>
              <Link to={"/assistant"}>
                <CreateListItem iconName="Assistant" text="AI Assistant" />
              </Link>
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
        <Box
          component="main"
          sx={{
            p: 3,
            width: "100vw",
            height: "100vh",
            backgroundColor: theme.palette.background.default,
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
        </Box>
      </Box>
    </BrowserRouter>
  );
}
