import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UploadExcel from './components/UploadExcel';
import AppBarComponent from './components/AppBar';
import Sidebar from './components/Sidebar';
import ContractorScreen from './components/ContractorScreen';
import AssignContractor from './components/AssignContractor';
import AuditProgress from './pages/AuditProgress';
import { Box, CssBaseline } from '@mui/material';

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            {token && <AppBarComponent />}
            <Box sx={{ display: 'flex' }}>
                {token && <Sidebar />}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: token ? '240px' : '0px' }}
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
                                <Route path="/contractor" element={<ContractorScreen />} />
                                <Route path="/assign-contractor" element={<AssignContractor />} />
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
