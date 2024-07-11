import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users';
const AUTH_URL = 'http://localhost:3001/api/auth';

export const createUser = (email, password, role) => {
    return axios.post(`${AUTH_URL}/register`, { email, password, role });
};

export const getUsers = () => {
    return axios.get(API_URL); // Asegúrate de que el backend tenga esta ruta implementada
};
