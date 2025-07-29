import { useState } from "react";
import AuthProvider from "./context/AuthContext"
import "./App.css";
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Dashboard from "./views/Dashboardd";
import Calendar from "./views/Calendar";
import Assistant from "./views/Assistant";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Routines from "./views/Routines";
import AppSettings from "./views/AppSettings";
import AccSettings from "./views/AccSettings";
import ResetPassword from "./ResetPassword";
import UpdateUser from "./UpdateUser";
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
              displex: "flex",
              justifyContent: "center",
              postion: "relative",
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
            <FitBitIcon />
            <Typography variant="h6" noWrap component="div">
              Fitness Tracker
            </Typography>
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
            width: "100%",
            backgroundColor: "#F0F0F0",
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
          </Routes>
          </AuthProvider>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
