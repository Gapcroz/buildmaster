import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Home, Dashboard, People, UploadFile } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Home', icon: <Home />, path: '/' },
        { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
        { text: 'Usuarios', icon: <People />, path: '/users' },
        { text: 'Asignar Contratista', icon: <UploadFile />, path: '/assign-contractor'},
        { text: 'Progreso semanal Contratista', icon: < Dashboard/>, path: '/contractor-weekly-progress' },
        { text: 'Progreso Auditor', icon: < Dashboard/>, path: '/audit-progress' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Nombre de la Aplicación
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index} onClick={() => navigate(item.path)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
