import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const ProjectProgressService = {
  getAssignedProjects: async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(`${baseUrl}/api/projects/assigned`, config);
    return response.data;
  },

  updateWeeklyProgress: async (projectId, week, realProgress, delayReason) => {
    const response = await axios.post(`${baseUrl}/api/projects/${projectId}/weekly-progress`, {
      week,
      realProgress,
      delayReason
    });
    return response.data;
  },

  addNewWeek: async (projectId, startDate, endDate, plannedProgress) => {
    const response = await axios.post(`${baseUrl}/api/projects/${projectId}/add-week`, {
      startDate,
      endDate,
      plannedProgress
    });
    return response.data;
  },

  uploadExcelFile: async (file, projectId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    const response = await axios.post(`${baseUrl}/api/upload/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

export default ProjectProgressService;