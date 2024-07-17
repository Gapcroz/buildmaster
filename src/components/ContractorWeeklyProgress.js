import React, { useState, useEffect } from 'react';
import { Container, Typography, Snackbar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Alert } from '@mui/material';
import UpdateWeeklyProgress from './WeeklyProgress/UpdateWeeklyProgress';
import AddNewWeek from './WeeklyProgress/AddNewWeek';
import UploadExcelFile from './WeeklyProgress/UploadExcelFile';
import ProjectProgressService from '../services/projectProgressService';

const ContractorWeeklyProgress = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  const fetchAssignedProjects = async () => {
    try {
      const fetchedProjects = await ProjectProgressService.getAssignedProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      showSnackbar('Error fetching assigned projects', 'error');
    }
  };

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);
  };

  const handleUpdateProgress = async (week, realProgress, delayReason) => {
    try {
      await ProjectProgressService.updateWeeklyProgress(selectedProject, week, realProgress, delayReason);
      showSnackbar('Weekly progress updated successfully', 'success');
      fetchAssignedProjects();
    } catch (error) {
      showSnackbar('Error updating weekly progress', 'error');
    }
  };

  const handleAddWeek = async (startDate, endDate, plannedProgress) => {
    try {
      await ProjectProgressService.addNewWeek(selectedProject, startDate, endDate, plannedProgress);
      showSnackbar('New week added successfully', 'success');
      fetchAssignedProjects();
    } catch (error) {
      showSnackbar('Error adding new week', 'error');
    }
  };

  const handleFileUpload = async (file, projectId) => {
    try {
      await ProjectProgressService.uploadExcelFile(file, projectId);
      showSnackbar('File uploaded successfully', 'success');
      fetchAssignedProjects();
    } catch (error) {
      showSnackbar(error.response?.data?.error || 'Error uploading file', 'error');
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
        <UpdateWeeklyProgress
          projects={projects}
          selectedProject={selectedProject}
          onProjectChange={handleProjectChange}
          onUpdateProgress={handleUpdateProgress}
        />
        <AddNewWeek onAddWeek={handleAddWeek} />
        <UploadExcelFile
          projects={projects}
          selectedProject={selectedProject}
          onProjectChange={handleProjectChange}
          onFileUpload={handleFileUpload}
        />
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