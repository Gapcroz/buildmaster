import axios from "axios";

const API_URL = "http://localhost:3001/api/users";
const AUTH_URL = "http://localhost:3001/api/auth";

export const createUser = (email, password, role) => {
  return axios.post(`${AUTH_URL}/register`, { email, password, role });
};

export const getUsers = () => {
  return axios.get(API_URL); // Asegúrate de que el backend tenga esta ruta implementada
};

export const deleteUser = (email) => {
  return axios.delete(`${API_URL}/delete`, { data: { email } });
};

export const getUserByEmail = (email) => {
  return axios.get(`${API_URL}/find`, { data: { email } });
};

export const updateUser = (email, password, role) => {
  return axios.patch(`${API_URL}/update`, { email, password, role });
};
