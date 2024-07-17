import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ProjectProgressChart from '../components/ProjectProgressChart';
import axios from 'axios';

const AuditProgress = () => {
  const [projects, setProjects] = useState([]);
  const baseUrl = 'http://localhost:3001';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get(`${baseUrl}/api/projects/projects`, config);
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