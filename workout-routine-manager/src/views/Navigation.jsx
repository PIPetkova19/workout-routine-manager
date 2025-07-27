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
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { CreateListItem, BasicButton, iconMap } from "./theme/Theme";
import { Link } from "react-router-dom";

const drawerWidth = 220;

export default function Navigation() {
  const FitBitIcon = iconMap["FitBit"];
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
              <MenuTwoTone />
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
    </>
  );
}
