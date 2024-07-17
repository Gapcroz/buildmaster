import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FormControl, InputLabel, MenuItem, Select, Typography, Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProjectProgressChart = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  const handleProjectChange = (event) => {
    const selected = projects.find(project => project._id === event.target.value);
    setSelectedProject(selected);
  };

  const chartData = {
    labels: selectedProject?.weeklyProgress.map(week => `Week ${week.week}`) || [],
    datasets: [
      {
        label: 'Planned Progress',
        data: selectedProject?.weeklyProgress.map(week => week.plannedProgress || 0) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Real Progress',
        data: selectedProject?.weeklyProgress.map(week => week.realProgress || 0) || [],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Project Progress: ${selectedProject?.name || ''}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Progress (%)',
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', padding: 2 }}>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="project-select-label">Select Project</InputLabel>
        <Select
          labelId="project-select-label"
          value={selectedProject?._id || ''}
          label="Select Project"
          onChange={handleProjectChange}
        >
          {projects.map((project) => (
            <MenuItem key={project._id} value={project._id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedProject ? (
        <>
          <Line data={chartData} options={options} />
          {selectedProject.weeklyProgress.map((week) => (
            <Typography key={week._id} variant="body2" sx={{ marginTop: 1 }}>
              Week {week.week}: {week.delayReason ? `Delay reason: ${week.delayReason}` : 'No delays reported'}
            </Typography>
          ))}
        </>
      ) : (
        <Typography>No project selected or no data available.</Typography>
      )}
    </Box>
  );
};

export default ProjectProgressChart;