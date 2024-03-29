import { projectSliceName } from "app/slices/projects";

const selectProjectSliceState = (state) => state[projectSliceName];

export const selectProjectList = (state) =>
  selectProjectSliceState(state)?.projectList;

export const selectProjects = (state) =>
  selectProjectSliceState(state).projects;

export const selectProjectById = (state, projectId) =>
  selectProjects(state)?.[projectId] || {};

export const selectColumnOrder = (state, projectId) =>
  selectProjectById(state, projectId)?.columnOrder;

export const selectNoteOrders = (state, projectId) =>
  selectProjectById(state, projectId)?.noteOrders;

export const selectNoteOrderByColumnId = (state, projectId, columnId) =>
  selectNoteOrders(state, projectId)?.[columnId];

export const selectNotes = (state, projectId) =>
  selectProjectSliceState(state)?.notes;

export const selectNoteById = (state, projectId, noteId) =>
  selectNotes(state, projectId)?.[noteId];

export const selectColumns = (state, projectId) =>
  selectProjectSliceState(state)?.columns;

export const selectColumnById = (state, projectId, columnId) =>
  selectColumns(state, projectId)?.[columnId];

export const selectAccessToken = (state) =>
  selectProjectSliceState(state).accessToken;
