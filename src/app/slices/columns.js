import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const columnState = {
  columns: {},
  columnOrder: [],
};

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
    loadColumns(state, action) {
      const { columns, columnOrder } = action.payload;
      return {
        ...state,
        columns,
        columnOrder,
      };
    },
  },
});

export const getColumns = (state) => state[columnSlice.name].columns;
export const getColumnOrder = (state) => state[columnSlice.name].columnOrder;
export const getColumnById = (state, id) => getColumns(state)?.[id];

export const columnActions = columnSlice.actions;
