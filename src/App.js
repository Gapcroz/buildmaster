import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import AuditProgress from "./pages/AuditProgress";
import UploadExcel from "./components/UploadExcel";
import AppBarComponent from "./components/AppBar";
import Sidebar from "./components/Sidebar";
import ContractorWeeklyProgress from "./components/ContractorWeeklyProgress";
import AssignContractor from "./components/AssignContractor";
import { Box, CssBaseline } from "@mui/material";

const App = () => {
  const token = localStorage.getItem("token");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMouseEnter = () => {
    setSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      {token && <AppBarComponent />}
      <Box sx={{ display: "flex" }}>
        {token && (
          <Sidebar
            open={sidebarOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            marginLeft: token ? (sidebarOpen ? "240px" : "0px") : "0px",
            transition: "margin-left 0.3s",
          }}
        >
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {token ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/upload" element={<UploadExcel />} />
                <Route
                  path="/contractor-weekly-progress"
                  element={<ContractorWeeklyProgress />}
                />
                <Route
                  path="/assign-contractor"
                  element={<AssignContractor />}
                />
                <Route path="/audit-progress" element={<AuditProgress />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
