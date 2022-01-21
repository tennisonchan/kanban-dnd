import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { getColumns, putColumns } from "app/apis";

export const columnState = {
  columns: {},
  columnOrder: [],
  isLoading: false,
};

export const fetchColumns = createAsyncThunk(
  "columns/fetchColumns",
  async () => {
    const resp = await getColumns();
    return resp.data;
  }
);

export const updateColumns = createAsyncThunk(
  "columns/updateColumns",
  async (payload) => {
    const resp = await putColumns(payload);
    return resp.data.data; // why data.data? json bin issue
  }
);

export const createColumn = (column) => ({
  id: uuid(),
  createdAt: Date.now(), // should be handled in backend
  ...column,
  updatedAt: Date.now(), // should be handled in backend
});

export const columnSlice = createSlice({
  name: "column",
  initialState: columnState,
  reducers: {
    reorderColumns(state, action) {
      const { columnOrder } = action.payload;
      return {
        ...state,
        columnOrder,
      };
    },
  },
  extraReducers: {
    [fetchColumns.fulfilled.type]: (state, action) => {
      const { columns, columnOrder } = action.payload;
      return {
        ...state,
        columns,
        columnOrder,
      };
    },
    [updateColumns.pending.type]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [updateColumns.fulfilled.type]: (state, action) => {
      const { columns, columnOrder } = action.payload;
      return {
        ...state,
        columns,
        columnOrder,
        isLoading: false,
      };
    },
  },
});

export const getColumnsSelector = (state) => state[columnSlice.name].columns;
export const getColumnOrder = (state) => state[columnSlice.name].columnOrder;
export const getColumnById = (state, id) => getColumnsSelector(state)?.[id];

export const columnActions = columnSlice.actions;
