// selectProject.js
import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { getProjects, getPieChartData } from "../../services/projectService";
import ExcelTable from "./ExcelTable";
import PieChartComponent from "./PieChart";
import { styled } from "@mui/system";

// Componentes estilizados
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export default function ProjectSelect() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await getProjects();
        console.log("Projects fetched:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);

  const handleChange = async (event) => {
    const selectedProjectId = event.target.value;
    const project = projects.find((proj) => proj._id === selectedProjectId);
    console.log("Selected project:", project);
    setSelectedProject(project);

    try {
      const chartDataResponse = await getPieChartData(selectedProjectId);
      console.log("Pie chart data fetched:", chartDataResponse.data);
      setPieChartData(chartDataResponse.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Seleccionar Proyecto
      </Typography>
      <StyledSelect
        value={selectedProject ? selectedProject._id : ""}
        onChange={handleChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>
          Seleccione un proyecto
        </MenuItem>
        {projects.map((project) => (
          <MenuItem key={project._id} value={project._id}>
            {project.name}
          </MenuItem>
        ))}
      </StyledSelect>
      {selectedProject && (
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={7}>
            <StyledPaper>
              <PieChartComponent data={pieChartData} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={12}>
            <StyledPaper>
              <ExcelTable projectId={selectedProject._id} />
            </StyledPaper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
