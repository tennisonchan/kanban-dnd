import axios from "axios";

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;
const API_URL = `${BASE_URL}/api`;
const config = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
};

export const getProjects = () => axios.get(`${API_URL}/projects`, config);

export const getProject = (projectId) =>
  axios.get(`${API_URL}/projects/${projectId}`, config);

export const postProject = (payload) =>
  axios.post(`${API_URL}/project/`, payload, config);

export const patchProject = (payload) =>
  axios.patch(`${API_URL}/project/`, payload, config);

export const deleteProject = (payload) =>
  axios.delete(`${API_URL}/project/`, payload, config);

export const postColumn = (payload) =>
  axios.post(`${API_URL}/column`, payload, config);

export const patchColumn = (payload) =>
  axios.patch(`${API_URL}/column`, payload, config);

export const deleteColumn = (columnId) =>
  axios.delete(`${API_URL}/columns/${columnId}`, config);

export const postColumnsReorder = (payload) =>
  axios.post(`${API_URL}/columns/reorder`, payload, config);

export const postNote = (payload) =>
  axios.post(`${API_URL}/note`, payload, config);

export const patchNote = (payload) =>
  axios.patch(`${API_URL}/note`, payload, config);

export const deleteNote = ({ noteId, columnId }) =>
  axios.delete(`${API_URL}/columns/${columnId}/notes/${noteId}`, config);

export const postNoteArchive = (payload) =>
  axios.post(`${API_URL}/note/archive`, payload, config);

export const postNotesReorder = (payload) =>
  axios.post(`${API_URL}/notes/reorder`, payload, config);
