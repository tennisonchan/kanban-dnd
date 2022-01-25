import axios from "axios";

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;
const config = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
};

export const getProjects = () => axios.get(`${BASE_URL}/projects`, config);

export const getProject = (projectId) =>
  axios.get(`${BASE_URL}/projects/${projectId}`, config);

export const postProject = (payload) =>
  axios.post(`${BASE_URL}/project/`, payload, config);

export const patchProject = (payload) =>
  axios.patch(`${BASE_URL}/project/`, payload, config);

export const deleteProject = (payload) =>
  axios.delete(`${BASE_URL}/project/`, payload, config);

export const postColumn = (payload) =>
  axios.post(`${BASE_URL}/column`, payload, config);

export const patchColumn = (payload) =>
  axios.patch(`${BASE_URL}/column`, payload, config);

export const deleteColumn = (columnId) =>
  axios.delete(`${BASE_URL}/columns/${columnId}`, config);

export const postColumnsReorder = (payload) =>
  axios.post(`${BASE_URL}/columns/reorder`, payload, config);

export const postNote = (payload) =>
  axios.post(`${BASE_URL}/note`, payload, config);

export const patchNote = (payload) =>
  axios.patch(`${BASE_URL}/note`, payload, config);

export const deleteNote = ({ noteId, columnId }) =>
  axios.delete(`${BASE_URL}/columns/${columnId}/notes/${noteId}`, config);

export const postNoteArchive = (payload) =>
  axios.post(`${BASE_URL}/note/archive`, payload, config);

export const postNotesReorder = (payload) =>
  axios.post(`${BASE_URL}/notes/reorder`, payload, config);
