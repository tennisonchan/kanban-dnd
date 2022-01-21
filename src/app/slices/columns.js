import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { getColumns } from "app/apis";

export const columnState = {
  columns: {},
  columnOrder: [],
};

export const fetchColumns = createAsyncThunk(
  "columns/fetchColumns",
  async () => {
    const resp = await getColumns();
    return resp.data;
  }
);

export const columnSlice = createSlice({
  name: "column",
  initialState: columnState,
  reducers: {
    addColumn(state, action) {
      const { column } = action.payload;
      const id = uuid();
      return {
        ...state,
        columns: {
          ...state.columns,
          [id]: column,
        },
        columnOrder: [...state.columnOrder, id],
      };
    },
    editColumn(state, action) {
      const { column } = action.payload;
      const { id } = column;
      return {
        ...state,
        columns: {
          ...state.columns,
          [id]: column,
        },
      };
    },
    reorderColumns(state, action) {
      const { columnOrder } = action.payload;
      return {
        ...state,
        columnOrder,
      };
    },
    removeColumn(state, action) {
      const { id: removeId } = action.payload;
      const { columns } = state;
      const columnOrder = state.columnOrder.filter((id) => id !== removeId);

      return {
        ...state,
        columnOrder,
        columns: columnOrder.reduce(
          (acc, id) => ({ ...acc, [id]: columns[id] }),
          {}
        ),
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
  },
});

export const getColumnsSelector = (state) => state[columnSlice.name].columns;
export const getColumnOrder = (state) => state[columnSlice.name].columnOrder;
export const getColumnById = (state, id) => getColumnsSelector(state)?.[id];

export const columnActions = columnSlice.actions;
