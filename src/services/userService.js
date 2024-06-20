import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users';

export const createUser = (email, password, role) => {
    return axios.post(`${API_URL}/register`, { email, password, role });
};

export const getUsers = () => {
    return axios.get(API_URL); // Asegúrate de que el backend tenga esta ruta implementada
};
