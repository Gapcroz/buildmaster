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
        fetchProjects();
        fetchUsers();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await getProjects();
            if (Array.isArray(response.data)) {
                setProjects(response.data);
            } else {
                console.error('Unexpected projects data format:', response.data);
                setProjects([]);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            handleError('Error fetching projects');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('Unexpected users data format:', response.data);
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            handleError('Error fetching users');
        }
    };

    const handleProjectChange = (e) => {
        setSelectedProject(e.target.value);
    };

    const handleContractorChange = (e) => {
        setSelectedContractor(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProject || !selectedContractor) {
            handleError('Please select both a project and a contractor');
            return;
        }
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
            handleError('Error assigning contractor');
        }
    };

    const handleError = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
        });
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
                        value={selectedProject}
                        onChange={handleProjectChange}
                    >
                        {projects.map((project, index) => (
                            <MenuItem key={index} value={project._id || project.id}>
                                {project.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="contractor-label">Contratista</InputLabel>
                    <Select
                        labelId="contractor-label"
                        value={selectedContractor}
                        onChange={handleContractorChange}
                    >
                        {users.filter(user => user.role === 'contractor').map((user, index) => (
                            <MenuItem key={index} value={user._id || user.id}>
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