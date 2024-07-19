import axios from "axios";

const API_URL = "http://localhost:3001/api/projects";

export const getProjects = () => {
  return axios.get(`${API_URL}/projects`);
};

export const assignContractor = (projectId, contractorId) => {
  return axios.post(`${API_URL}/assign-contractor`, {
    projectId,
    contractorId,
  });
};
export const getProjectData = async (projectId) => {
  return axios.get(`${API_URL}/${projectId}`);
}
export const getPieChartData = async (projectId) => {
  return axios.get(`${API_URL}/pie-chart-data/${projectId}`);
};