import React from "react";
import CreateUserForm from "../components/CreateUserForm";
import DeleteUser from "../components/DeleteUser";
import UpdateUser from "../components/updateUser";

const Users = () => {
  return (
    <div>
      <h1>Users</h1>
      <CreateUserForm />
      <DeleteUser />
      <UpdateUser />
    </div>
  );
};

export default Users;
