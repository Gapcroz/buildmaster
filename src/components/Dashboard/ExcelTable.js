// excelTable.js
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
  const [excelData, setExcelData] = useState(null);

  //TODO, receive from elsewhere in the frontend instead of doing an API call (too late for that now ig)
  useEffect(() => {
    async function fetchExcelData() {
      try {
        console.log("Fetching data for project ID:", projectId);
        const response = await getProjectData(projectId);
        console.log("Data fetched:", response.data);
        setExcelData(response.data);
      } catch (error) {
        console.error("Error fetching Excel data:", error);
      }
    }

    if (projectId) {
      fetchExcelData();
    }
  }, [projectId]);

  if (!excelData) {
    return <Typography>Cargando datos...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Datos del Proyecto: {excelData.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Semanas:
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
          </TableRow>
        </TableHead>
        <TableBody>
          {excelData.weeks.map((week, index) => (
            <TableRow key={index}>
              <TableCell>{week.week}</TableCell>
              <TableCell>{week.startDate}</TableCell>
              <TableCell>{week.endDate}</TableCell>
              <TableCell>{week.plannedProgress}</TableCell>
              <TableCell>{week.realProgress}</TableCell>
              <TableCell>{week.delayReason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ExcelTable;
