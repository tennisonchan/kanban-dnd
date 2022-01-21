import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { getNotes, putNotes } from "app/apis";

export const noteState = {
  notes: {},
  noteOrders: {},
};

export const createNoteTemplate = (note) => ({
  id: uuid(), // should be handled in backend
  status: 1,
  archived: false,
  createdAt: Date.now(), // should be handled in backend
  ...note,
  updatedAt: Date.now(), // should be handled in backend
});

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const resp = await getNotes();
  return resp.data;
});

export const updateNotes = createAsyncThunk(
  "notes/updateNotes",
  async (payload) => {
    const resp = await putNotes(payload);
    return resp.data.data;
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState: noteState,
  reducers: {
    reorderNotes(state, action) {
      const { noteOrders } = action.payload;
      return { ...state, noteOrders };
    },
  },
  extraReducers: {
    [fetchNotes.fulfilled.type]: (state, action) => {
      const { notes, noteOrders } = action.payload;
      return {
        ...state,
        notes,
        noteOrders,
      };
    },
    [updateNotes.fulfilled.type]: (state, action) => {
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
export const getNotesSelector = (state) => getNoteState(state).notes;
export const getNoteOrders = (state) => getNoteState(state).noteOrders;
export const getNoteOrderByColumnId = (state, columnId) =>
  getNoteOrders(state)?.[columnId];

export const getNoteById = (state, id) => getNotes(state)?.[id];

export const noteActions = noteSlice.actions;
