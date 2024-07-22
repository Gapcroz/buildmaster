import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { deleteUser } from "../services/userService";
import Swal from "sweetalert2";

const DeleteUser = () => {
  const [id, setId] = useState("");

  const deleteSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Usuario eliminado exitosamente",
        });
        setId("");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el usuario. Por favor, inténtelo de nuevo.",
        });
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Eliminar Usuario
      </Typography>
      <form onSubmit={deleteSubmit}>
        <TextField
          label="ID"
          type="text"
          fullWidth
          margin="normal"
          value={id}
          onChange={(e) => setId(e.target.value)}
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
