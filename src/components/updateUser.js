import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getUserById, updateUser } from "../services/userService";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [userFound, setUserFound] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Llenar campo obligatorio",
      });
      return;
    }
    try {
      const user = await getUserById(id);
      if (user) {
        setEmail(user.data.email);
        setPassword(user.data.password);
        setRole(user.data.role);
        setUserFound(true);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Usuario encontrado exitosamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario no encontrado",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo encontrar el usuario. Por favor, inténtelo de nuevo.",
      });
      console.error("Error searching user:", error);
    }
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, email, password, role);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario actualizado exitosamente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el usuario. Por favor, inténtelo de nuevo.",
      });
      console.error("Error actualizando usuario:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Actualizar usuario
      </Typography>
      <form onSubmit={searchUser}>
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
          Buscar
        </Button>
      </form>
      {userFound && (
        <form onSubmit={updateSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="contractor">Contractor</MenuItem>
              <MenuItem value="auditor">Auditor</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Actualizar
          </Button>
        </form>
      )}
    </Container>
  );
};

export default UpdateUser;
