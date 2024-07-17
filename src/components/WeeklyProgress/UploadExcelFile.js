import React, { useState } from 'react';
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Grid } from '@mui/material';

const UploadExcelFile = ({ projects, selectedProject, onProjectChange, onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileUpload = () => {
    if (file && selectedProject) {
      onFileUpload(file, selectedProject);
      setFile(null);
    }
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Upload Excel File
        </Typography>
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
        <TextField
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFileUpload}
          fullWidth
          style={{ marginTop: '1rem' }}
          disabled={!file || !selectedProject}
        >
          Upload Excel File
        </Button>
      </Paper>
    </Grid>
  );
};

export default UploadExcelFile;