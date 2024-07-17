import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getProjects, assignContractor } from '../services/projectService';
import { getUsers } from '../services/userService';
import Swal from 'sweetalert2';

const AssignContractor = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedContractor, setSelectedContractor] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error fetching projects',
                });
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error fetching users',
                });
            }
        };

        fetchProjects();
        fetchUsers();
    }, []);

    const handleProjectChange = (e) => {
        setSelectedProject(e.target.value);
    };

    const handleContractorChange = (e) => {
        setSelectedContractor(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await assignContractor(selectedProject._id, selectedContractor);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Contratista asignado exitosamente',
            });
            setSelectedProject('');
            setSelectedContractor('');
        } catch (error) {
            console.error('Error assigning contractor:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error assigning contractor',
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Asignar Contratista a Proyecto
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="project-label">Proyecto</InputLabel>
                    <Select
                        labelId="project-label"
                        value={selectedProject || ''}
                        onChange={handleProjectChange}
                    >
                        {projects.map((project) => (
                            <MenuItem key={project._id} value={project}>
                                {project.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="contractor-label">Contratista</InputLabel>
                    <Select
                        labelId="contractor-label"
                        value={selectedContractor || ''}
                        onChange={handleContractorChange}
                    >
                        {users.filter(user => user.role === 'contractor').map((user) => (
                            <MenuItem key={user._id} value={user._id}>
                                {user.email}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
                    Asignar Contratista
                </Button>
            </form>
        </Container>
    );
};

export default AssignContractor;