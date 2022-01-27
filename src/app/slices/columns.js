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
    const { projectId } = column;
    const project = state.projects[projectId];
    return {
      ...state,
      columns: {
        ...state.columns,
        [column.id]: column,
      },
      projects: {
        ...state.projects,
        [projectId]: {
          ...project,
          columnOrder,
        },
      },
    };
  },
  [updateColumn.fulfilled.type]: (state, action) => {
    const { column } = action.payload;
    return {
      ...state,
      columns: {
        ...state.columns,
        [column.id]: column,
      },
    };
  },
  [removeColumn.fulfilled.type]: (state, action) => {
    const { column, columnOrder, noteOrders } = action.payload;
    const { projectId } = column;
    const project = state.projects[projectId];
    const columns = { ...state.columns };
    delete columns[column.id];

    return {
      ...state,
      columns,
      projects: {
        ...state.projects,
        [projectId]: {
          ...project,
          columnOrder,
          noteOrders,
        },
      },
    };
  },
};
