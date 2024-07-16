import React from "react";
import CreateUserForm from "../components/CreateUserForm";
import DeleteUser from "../components/DeleteUser";
import UpdateUser from "../components/updateUser";
import AllUsersForm from "../components/AllUsersForm";

const Users = () => {
  return (
    <div>
      <h1>Users</h1>
      <CreateUserForm />
      <DeleteUser />
      <UpdateUser />
      <AllUsersForm />
    </div>
  );
};

export default Users;
