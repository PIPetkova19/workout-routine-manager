import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navigation from "./views/Navigation";
import Dashboard from "./views/Dashboardd";
import Calendar from "./views/Calendar";
import Assistant from "./views/Assistant";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Routines from "./views/Routines";
import AppSettings from "./views/AppSettings";
import AccSettings from "./views/AccSettings";
import { Box } from "@mui/material";

const drawerWidth = 220;

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { md: `${drawerWidth}px` },
            mt: { xs: "64px", md: "64px" },
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/routines" element={<Routines />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/appsettings" element={<AppSettings />} />
            <Route path="/accsettings" element={<AccSettings />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
