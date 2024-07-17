import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ProjectProgressChart from '../components/ProjectProgressChart';
import { getProjects } from '../services/projectService';

const AuditProgress = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Project Progress Overview
      </Typography>
      <ProjectProgressChart projects={projects} />
    </Container>
  );
};

export default AuditProgress;