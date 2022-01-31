import axios from "axios";

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const API_URL = `${BASE_URL}/api`;

export const getProjects = () => axios.get(`${API_URL}/projects`);

export const getProject = (projectId) =>
  axios.get(`${API_URL}/projects/${projectId}`);

export const postProject = (payload) =>
  axios.post(`${API_URL}/project/`, payload);

export const patchProject = (payload) =>
  axios.patch(`${API_URL}/project/`, payload);

export const deleteProject = (projectId) =>
  axios.delete(`${API_URL}/project/${projectId}`);

export const postColumn = (payload) => axios.post(`${API_URL}/column`, payload);

export const patchColumn = (payload) =>
  axios.patch(`${API_URL}/column`, payload);

export const deleteColumn = (columnId) =>
  axios.delete(`${API_URL}/columns/${columnId}`);

export const postColumnsReorder = (payload) =>
  axios.post(`${API_URL}/columns/reorder`, payload);

export const postNote = (payload) => axios.post(`${API_URL}/note`, payload);

export const patchNote = (payload) => axios.patch(`${API_URL}/note`, payload);

export const deleteNote = ({ noteId, columnId }) =>
  axios.delete(`${API_URL}/columns/${columnId}/notes/${noteId}`);

export const postNoteArchive = (payload) =>
  axios.post(`${API_URL}/note/archive`, payload);

export const postNotesReorder = (payload) =>
  axios.post(`${API_URL}/notes/reorder`, payload);

export const postJWT = (payload) => axios.post(`${API_URL}/jwt`, payload);

export const getCSRF = async () => {
  const { data } = await axios.get(`${BASE_URL}/csrf`);
  axios.defaults.headers.common["x-csrf-token"] = data.csrfToken;
};
