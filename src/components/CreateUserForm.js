import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createUser } from '../services/userService';
import Swal from 'sweetalert2';

const CreateUserForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!email || !password || !confirmPassword || !role) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios',
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
            });
            return;
        }

        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos 6 caracteres',
            });
            return;
        }

        // Crear usuario
        try {
            await createUser(email, password, role); // Usar email como nombre de usuario
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Usuario creado exitosamente',
            });
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setRole('');
        } catch (error) {
            console.error('Error creando usuario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error creando usuario',
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Crear Nuevo Usuario
            </Typography>
            <form onSubmit={handleSubmit}>
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
                    Crear Usuario
                </Button>
            </form>
        </Container>
    );
};

export default CreateUserForm;
