import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const noteState = {
  notes: {},
  noteOrders: {},
};

export const noteSlice = createSlice({
  name: "note",
  initialState: noteState,
  reducers: {
    addNote(state, action) {
      const { note, columnId } = action.payload;
      const id = uuid(); // should be handled in backend
      const createdAt = Date.now(); // should be handled in backend
      const noteOrder = state.noteOrders[columnId] || [];
      return {
        ...state,
        noteOrders: { ...state.noteOrders, [columnId]: [id, ...noteOrder] },
        notes: { ...state.notes, [id]: { ...note, id, createdAt } },
      };
    },
    editNote(state, action) {
      const { note } = action.payload;
      const { id } = note;
      return {
        ...state,
        notes: {
          ...state.notes,
          [id]: note,
        },
      };
    },
    removeNote(state, action) {
      const { id: removeId, columnId } = action.payload;
      const noteOrder = state.noteOrders[columnId].filter(
        (id) => id !== removeId
      );

      return {
        ...state,
        noteOrders: {
          ...state.noteOrders,
          [columnId]: noteOrder,
        },
        notes: {
          ...state.notes,
          [removeId]: null,
        },
      };
    },
    loadNotes(state, action) {
      const { notes, noteOrders } = action.payload;
      return {
        ...state,
        notes,
        noteOrders,
      };
    },
  },
});

const getNoteState = (state) => state[noteSlice.name];
export const getNotes = (state) => getNoteState(state).notes;
export const getNoteOrders = (state) => getNoteState(state).noteOrders;
export const getNoteOrderByColumnId = (state, columnId) =>
  getNoteOrders(state)?.[columnId];

export const getNoteById = (state, id) => getNotes(state)?.[id];

export const noteActions = noteSlice.actions;
