import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getWeeks, updateProgress } from '../services/progressService';
import Swal from 'sweetalert2';

const ContractorScreen = () => {
    const [projectName, setProjectName] = useState('');
    const [weeks, setWeeks] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [plannedProgress, setPlannedProgress] = useState('');
    const [realProgress, setRealProgress] = useState('');
    const [delayReason, setDelayReason] = useState('');

    useEffect(() => {
        if (projectName) {
            const fetchWeeks = async () => {
                try {
                    const response = await getWeeks(projectName);
                    setWeeks(response.data);
                } catch (error) {
                    console.error('Error fetching weeks:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error fetching weeks',
                    });
                }
            };

            fetchWeeks();
        }
    }, [projectName]);

    const handleProjectChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleWeekChange = (e) => {
        const selected = weeks.find(week => week.week === e.target.value);
        setSelectedWeek(selected.week);
        setStartDate(selected.startDate);
        setEndDate(selected.endDate);
        setPlannedProgress(selected.plannedProgress);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!realProgress || isNaN(realProgress) || realProgress < 0 || realProgress > 100) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid real progress percentage between 0 and 100',
            });
            return;
        }

        try {
            await updateProgress(projectName, selectedWeek, realProgress, delayReason);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Progreso actualizado exitosamente',
            });
            setRealProgress('');
            setDelayReason('');
        } catch (error) {
            console.error('Error updating progress:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error updating progress',
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Actualizar Progreso Semanal
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre del Proyecto"
                    fullWidth
                    margin="normal"
                    value={projectName}
                    onChange={handleProjectChange}
                    required
                />
                {projectName && (
                    <>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="week-label">Semana</InputLabel>
                            <Select
                                labelId="week-label"
                                value={selectedWeek}
                                onChange={handleWeekChange}
                            >
                                {weeks.map((week, index) => (
                                    <MenuItem key={index} value={week.week}>
                                        {week.week}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Fecha de Inicio"
                            fullWidth
                            margin="normal"
                            value={startDate}
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            label="Fecha de Fin"
                            fullWidth
                            margin="normal"
                            value={endDate}
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            label="Progreso Programado"
                            fullWidth
                            margin="normal"
                            value={plannedProgress}
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            label="Progreso Real"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={realProgress}
                            onChange={(e) => setRealProgress(e.target.value)}
                            required
                        />
                        <TextField
                            label="Razones de Retraso"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={delayReason}
                            onChange={(e) => setDelayReason(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
                            Actualizar Progreso
                        </Button>
                    </>
                )}
            </form>
        </Container>
    );
};

export default ContractorScreen;
