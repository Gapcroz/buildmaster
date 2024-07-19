import React from "react";
import { Container, Typography } from "@mui/material";
import SelectProject from "../components/Dashboard/SelectProject";

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <div>
        <div>
          <SelectProject />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
