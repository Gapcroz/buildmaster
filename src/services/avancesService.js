import axios from 'axios';

const API_URL = 'http://localhost:3001/api/avances';

export const getProjects = () => {
    return axios.get(`${API_URL}/projects`);
};

export const assignContractor = (projectName, contractorId) => {
    return axios.post(`${API_URL}/assign-contractor`, { projectName, contractorId });
};
