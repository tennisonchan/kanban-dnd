import { createAsyncThunk } from "@reduxjs/toolkit";
import { postColumn, patchColumn, deleteColumn } from "app/apis";

export const createColumn = createAsyncThunk(
  "column/createColumn",
  async (payload) => {
    const resp = await postColumn(payload);
    return resp.data;
  }
);

export const updateColumn = createAsyncThunk(
  "column/updateColumn",
  async (payload) => {
    const resp = await patchColumn(payload);
    return resp.data;
  }
);

export const removeColumn = createAsyncThunk(
  "column/removeColumn",
  async (payload) => {
    const resp = await deleteColumn(payload);
    return resp.data;
  }
);

export const extraReducers = {
  [createColumn.fulfilled.type]: (state, action) => {
    const { column, columnOrder } = action.payload;
    const projectId = column.project;
    const project = state.projects[projectId];
    return {
      ...state,
      projects: {
        ...state.projects,
        [projectId]: {
          ...project,
          columnOrder,
          columns: {
            ...project.columns,
            [column.id]: column,
          },
        },
      },
    };
  },
  [updateColumn.fulfilled.type]: (state, action) => {
    const { column } = action.payload;
    const projectId = column.project;
    const project = state.projects[projectId];
    return {
      ...state,
      projects: {
        ...state.projects,
        [projectId]: {
          ...project,
          columns: {
            ...project.columns,
            [column.id]: column,
          },
        },
      },
    };
  },
  [removeColumn.fulfilled.type]: (state, action) => {
    const { column, columnOrder, noteOrders } = action.payload;
    const projectId = column.project;
    const project = state.projects[projectId];
    const columns = { ...project.columns };
    delete columns[column.id];

    return {
      ...state,
      projects: {
        ...state.projects,
        [projectId]: {
          ...project,
          columnOrder,
          noteOrders,
          columns,
        },
      },
    };
  },
};
