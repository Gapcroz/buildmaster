import React, { useState } from 'react';
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Grid } from '@mui/material';

const UpdateWeeklyProgress = ({ projects, selectedProject, onProjectChange, onUpdateProgress }) => {
  const [selectedWeek, setSelectedWeek] = useState('');
  const [realProgress, setRealProgress] = useState('');
  const [delayReason, setDelayReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProgress(selectedWeek, parseFloat(realProgress), delayReason);
  };

  const getSelectedProjectWeeks = () => {
    const project = projects.find(p => p._id === selectedProject);
    return project ? project.weeklyProgress : [];
  };

  return (
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
              onChange={onProjectChange}
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
              disabled={!selectedProject}
            >
              {getSelectedProjectWeeks().map((week) => (
                <MenuItem key={week.week} value={week.week}>
                  Week {week.week} ({new Date(week.startDate).toLocaleDateString()} - {new Date(week.endDate).toLocaleDateString()})
                </MenuItem>
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
  );
};

export default UpdateWeeklyProgress;