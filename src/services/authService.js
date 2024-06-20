import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const register = (username, email, password) => {
    return axios.post(`${API_URL}/register`, { username, email, password });
};

export const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
};
