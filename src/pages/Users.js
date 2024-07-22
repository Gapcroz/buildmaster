import React from "react";
import CreateUserForm from "../components/CreateUserForm";
import DeleteUser from "../components/DeleteUser";
import UpdateUser from "../components/UpdateUser";
import AllUsersForm from "../components/AllUsersForm";
import { Box, styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "600px",
}));

const Users = () => {
  return (
    <div>
      <h1>Users</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledBox>
          <CreateUserForm />
        </StyledBox>
        <StyledBox>
          <DeleteUser />
        </StyledBox>
        <StyledBox>
          <UpdateUser />
        </StyledBox>
        <StyledBox>
          <AllUsersForm />
        </StyledBox>
      </div>
    </div>
  );
};

export default Users;
