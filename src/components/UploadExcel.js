import React, { useState } from 'react';
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
  Paper
} from '@mui/material';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [projectName, setProjectName] = useState('');

  const handleFileUpload = async () => {

    if (!file || !projectName ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectName', projectName);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setData(response.data.data);
      } else {
        alert('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file', error);
      alert('Error uploading file');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Subir archivo de progreso
      </Typography>
      <TextField
        label="Nombre del Proyecto"
        fullWidth
        margin="normal"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
      />
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
        Subir
      </Button>

      {data.length > 0 && (
        <>
          <Typography variant="h6" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
            Datos importados:
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Etapa</TableCell>
                  <TableCell>% Avance</TableCell>
                  <TableCell>Condominio</TableCell>
                  <TableCell>Manzana</TableCell>
                  <TableCell>Lote</TableCell>
                  <TableCell>Int.</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Semana</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Progreso</TableCell>
                  <TableCell>Causa Retraso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((avance, index) =>
                  avance.semanas.map((semana, subIndex) => (
                    <TableRow key={`${index}-${subIndex}`}>
                      <TableCell>{avance.etapa}</TableCell>
                      <TableCell>{avance.tipoAvance}</TableCell>
                      <TableCell>{avance.condominio}</TableCell>
                      <TableCell>{avance.mza}</TableCell>
                      <TableCell>{avance.lote}</TableCell>
                      <TableCell>{avance.int}</TableCell>
                      <TableCell>{avance.tipo}</TableCell>
                      <TableCell>{semana.semana}</TableCell>
                      <TableCell>{semana.fecha}</TableCell>
                      <TableCell>{semana.progreso}</TableCell>
                      <TableCell>{semana.causaRetraso}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default UploadExcel;
