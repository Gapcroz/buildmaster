import axios from 'axios';

const API_URL = 'http://localhost:3001/api/progress';

export const getProjects = () => {
    return axios.get(`${API_URL}/projects`);
};

export const getWeeks = (projectName) => {
    return axios.get(`${API_URL}/weeks/${projectName}`);
};

export const updateProgress = (projectName, week, realProgress, delayReason) => {
    return axios.post(`${API_URL}/update`, { projectName, week, realProgress, delayReason });
};
