// frontend/src/components/UserList.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { getUsers } from "../services/userService";
import Swal from "sweetalert2";

const AllUsersForm = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener la lista de usuarios. Por favor, inténtelo de nuevo.",
        });
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Usuarios
      </Typography>
      <Button variant="contained" color="primary" onClick={toggleUsers}>
        {showUsers ? "Ocultar Usuarios" : "Mostrar Usuarios"}
      </Button>
      {showUsers && (
        <List>
          {users.map((user) => (
            <ListItem key={user._id}>
              <ListItemText
                primary={`Email: ${user.email}`}
                secondary={`ID: ${user._id}, 
                            Rol: ${user.role}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default AllUsersForm;
