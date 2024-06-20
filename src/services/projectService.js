import axios from 'axios';

const API_URL = 'http://localhost:3001/api/avances';

export const getProjects = () => {
    return axios.get(`${API_URL}/getprojects`);
};

export const assignContractor = (projectId, contractorId) => {
    return axios.post(`${API_URL}/assign-contractor`, { projectId, contractorId });
};
