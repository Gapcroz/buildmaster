import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Home, Dashboard, People, UploadFile } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 300;

const Sidebar = ({ open, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Usuarios", icon: <People />, path: "/users" },
    {
      text: "Asignar Contratista",
      icon: <UploadFile />,
      path: "/assign-contractor",
    },
    {
      text: "Progreso semanal Contratista",
      icon: <Dashboard />,
      path: "/contractor-weekly-progress",
    },
    { text: "Progreso Auditor", icon: <Dashboard />, path: "/audit-progress" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        transition: "width 0.3s",
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 0,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
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
