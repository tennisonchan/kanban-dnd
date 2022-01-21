import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { columnState } from "app/store";

export const columnSlice = createSlice({
  name: "column",
  initialState: columnState,
  reducers: {
    addColumn(state, action) {
      const { column } = action.payload;
      const id = uuid();
      state = {
        ...state,
        columns: {
          ...state.columns,
          [id]: column,
        },
        columnOrder: [...state.columnOrder, column.id],
      };
    },
    editColumn(state, action) {
      const { column } = action.payload;
      const { id, ...changes } = column;
      state.columns[id] = {
        ...state.columns[id],
        ...changes,
      };
    },
    loadColumns(state, action) {
      const { columns, columnOrder } = action.payload;
      state = {
        ...state,
        columns,
        columnOrder,
      };
      return state;
    },
  },
});

export const getColumns = (state) => state[columnSlice.name].columns;
export const getColumnOrder = (state) => state[columnSlice.name].columnOrder;
export const getColumnById = (state, id) => getColumns(state)?.[id];

export const columnActions = columnSlice.actions;
