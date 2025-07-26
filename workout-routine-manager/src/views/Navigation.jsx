import { useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import FitbitTwoToneIcon from "@mui/icons-material/FitbitTwoTone"; // <-- добави MailIcon
import { CreateListItem } from "./theme/Theme";
import {
  SpaceDashboardTwoTone,
  FitnessCenterTwoTone,
  SmartToyTwoTone,
  CalendarMonthTwoTone,
  SettingsTwoTone,
  AccountCircleTwoTone,
  MenuTwoTone,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const drawerWidth = 220;

export default function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            displex: "flex",
            justifyContent: "center",
            postion: "relative"
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
              }}>
              <MenuTwoTone />
            </IconButton>
          )}
          <FitbitTwoToneIcon sx={{ mr: 1 }}/>
          <Typography variant="h6" noWrap component="div">
            Fitness Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      {/*Desktop Drawer*/}
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
              <CreateListItem Icon={SpaceDashboardTwoTone} text="Dashboard" />
            </Link>
            <Link to={"/routines"}>
              <CreateListItem Icon={FitnessCenterTwoTone} text="Routines" />
            </Link>
            <Link to={"/calendar"}>
              <CreateListItem Icon={CalendarMonthTwoTone} text="Calendar" />
            </Link>
            <Link to={"/assistant"}>
              <CreateListItem Icon={SmartToyTwoTone} text="AI Assistant" />
            </Link>
          </List>
        </Box>
        <Box onClick={toggleDrawer(false)} sx={{ mt: "auto" }}>
          <Divider />
          <List sx={{ display: "flex", justifyContent: "center"}}>
            <Link to={"/accsettings"}>
              <Button variant="outlined" sx={{ mr: 2 }}>
                <AccountCircleTwoTone />
              </Button>
            </Link>
            <Link to={"/appsettings"}>
              <Button variant="outlined">
                <SettingsTwoTone />
              </Button>
            </Link>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
