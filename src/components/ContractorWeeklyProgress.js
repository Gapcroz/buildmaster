import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Alert } from '@mui/material';

const ContractorWeeklyProgress = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [realProgress, setRealProgress] = useState('');
  const [delayReason, setDelayReason] = useState('');
  const [newWeekStart, setNewWeekStart] = useState('');
  const [newWeekEnd, setNewWeekEnd] = useState('');
  const [newWeekPlannedProgress, setNewWeekPlannedProgress] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const baseUrl = 'http://localhost:3001';

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  const fetchAssignedProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      const response = await axios.get(`${baseUrl}/api/projects/assigned`, config);
      setProjects(response.data);
    } catch (error) {
      showSnackbar('Error fetching assigned projects', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/projects/${selectedProject}/weekly-progress`, {
        week: selectedWeek,
        realProgress: parseFloat(realProgress),
        delayReason
      });
      showSnackbar('Weekly progress updated successfully', 'success');
      fetchAssignedProjects(); // Refresh the projects data
    } catch (error) {
      showSnackbar('Error updating weekly progress', 'error');
    }
  };

  const handleAddWeek = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/projects/${selectedProject}/add-week`, {
        startDate: newWeekStart,
        endDate: newWeekEnd,
        plannedProgress: parseFloat(newWeekPlannedProgress)
      });
      showSnackbar('New week added successfully', 'success');
      fetchAssignedProjects(); // Refresh the projects data
      setNewWeekStart('');
      setNewWeekEnd('');
      setNewWeekPlannedProgress('');
    } catch (error) {
      showSnackbar('Error adding new week', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const getSelectedProjectWeeks = () => {
    const project = projects.find(p => p._id === selectedProject);
    return project ? project.weeklyProgress : [];
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Contractor Weekly Progress
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Update Weekly Progress
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Project</InputLabel>
                <Select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  required
                >
                  {projects.map((project) => (
                    <MenuItem key={project._id} value={project._id}>{project.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Week</InputLabel>
                <Select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  required
                >
                  {getSelectedProjectWeeks().map((week) => (
                    <MenuItem key={week.week} value={week.week}>Week {week.week}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Real Progress (%)"
                type="number"
                value={realProgress}
                onChange={(e) => setRealProgress(e.target.value)}
                required
                inputProps={{ min: 0, max: 100 }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Delay Reason (if any)"
                value={delayReason}
                onChange={(e) => setDelayReason(e.target.value)}
                multiline
                rows={3}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Progress
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Add New Week
            </Typography>
            <form onSubmit={handleAddWeek}>
              <TextField
                fullWidth
                margin="normal"
                label="Start Date"
                type="date"
                value={newWeekStart}
                onChange={(e) => setNewWeekStart(e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="End Date"
                type="date"
                value={newWeekEnd}
                onChange={(e) => setNewWeekEnd(e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Planned Progress (%)"
                type="number"
                value={newWeekPlannedProgress}
                onChange={(e) => setNewWeekPlannedProgress(e.target.value)}
                required
                inputProps={{ min: 0, max: 100 }}
              />
              <Button type="submit" variant="contained" color="secondary" fullWidth>
                Add Week
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      {selectedProject && (
        <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Project Progress Visualization
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Week</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Planned Progress</TableCell>
                  <TableCell>Real Progress</TableCell>
                  <TableCell>Delay Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getSelectedProjectWeeks().map((week) => (
                  <TableRow key={week.week}>
                    <TableCell>{week.week}</TableCell>
                    <TableCell>{new Date(week.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(week.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{week.plannedProgress}%</TableCell>
                    <TableCell>{week.realProgress || 'N/A'}%</TableCell>
                    <TableCell>{week.delayReason || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContractorWeeklyProgress;