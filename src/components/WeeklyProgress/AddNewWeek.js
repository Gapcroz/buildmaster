import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Grid } from '@mui/material';

const AddNewWeek = ({ onAddWeek }) => {
  const [newWeekStart, setNewWeekStart] = useState('');
  const [newWeekEnd, setNewWeekEnd] = useState('');
  const [newWeekPlannedProgress, setNewWeekPlannedProgress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddWeek(newWeekStart, newWeekEnd, parseFloat(newWeekPlannedProgress));
    setNewWeekStart('');
    setNewWeekEnd('');
    setNewWeekPlannedProgress('');
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Add New Week
        </Typography>
        <form onSubmit={handleSubmit}>
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
  );
};

export default AddNewWeek;