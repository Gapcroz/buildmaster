import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { deleteUser } from "../services/userService";
import Swal from "sweetalert2";

const DeleteUser = () => {
  const [email, setEmail] = useState("");

  const deleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(email);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario eliminado exitosamente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el usuario. Por favor, inténtelo de nuevo.",
      });
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Eliminar Usuario
      </Typography>
      <form onSubmit={deleteSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Eliminar
        </Button>
      </form>
    </Container>
  );
};

export default DeleteUser;
