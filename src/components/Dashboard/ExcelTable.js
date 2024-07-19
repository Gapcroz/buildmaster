import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getProjectData } from "../../services/projectService";

const ExcelTable = ({ projectId }) => {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    async function fetchProjectData() {
      try {
        console.log("Fetching data for project ID:", projectId);
        const response = await getProjectData(projectId);
        console.log("Data fetched:", response.data);
        setProjectData(response.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    }

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  if (!projectData) {
    return <Typography>Cargando datos...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Datos del Proyecto: {projectData.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Progreso Semanal:
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Semana</TableCell>
            <TableCell>Fecha de Inicio</TableCell>
            <TableCell>Fecha de Fin</TableCell>
            <TableCell>Progreso Planeado</TableCell>
            <TableCell>Progreso Real</TableCell>
            <TableCell>Razón del Retraso</TableCell>
            <TableCell>Última Actualización</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectData.weeklyProgress.map((week, index) => (
            <TableRow key={index}>
              <TableCell>{week.week}</TableCell>
              <TableCell>{new Date(week.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(week.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{week.plannedProgress}</TableCell>
              <TableCell>{week.realProgress}</TableCell>
              <TableCell>{week.delayReason}</TableCell>
              <TableCell>{new Date(week.lastUpdated).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ExcelTable;