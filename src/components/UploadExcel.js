import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [uploadedData, setUploadedData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const baseUrl = "http://localhost:3001/api";
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${baseUrl}/projects/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      showSnackbar('Error fetching projects', 'error');
    }
  };

  const handleFileUpload = async () => {
    if (!file || !selectedProject) {
      showSnackbar('Please select a file and a project', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', selectedProject);

    try {
      const response = await axios.post('http://localhost:3001/api/upload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setUploadedData(response.data.project);
        showSnackbar('File uploaded successfully', 'success');
      } else {
        showSnackbar('Error uploading file', 'error');
      }
    } catch (error) {
      console.error('Error uploading file', error);
      showSnackbar(error.response?.data?.error || 'Error uploading file', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Upload Progress File
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="project-select-label">Select Project</InputLabel>
        <Select
          labelId="project-select-label"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
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
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFileUpload}
        fullWidth
        style={{ marginTop: '1rem' }}
      >
        Upload
      </Button>

      {uploadedData && (
        <>
          <Typography variant="h6" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
            Uploaded Data:
          </Typography>
          <TableContainer component={Paper}>
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
                {uploadedData.weeklyProgress.map((week, index) => (
                  <TableRow key={index}>
                    <TableCell>{week.week}</TableCell>
                    <TableCell>{week.startDate || 'N/A'}</TableCell>
                    <TableCell>{week.endDate || 'N/A'}</TableCell>
                    <TableCell>{week.plannedProgress !== null ? `${week.plannedProgress}%` : 'N/A'}</TableCell>
                    <TableCell>{week.realProgress !== null ? `${week.realProgress}%` : 'N/A'}</TableCell>
                    <TableCell>{week.delayReason || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UploadExcel;