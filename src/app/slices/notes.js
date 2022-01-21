import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { getNotes } from "app/apis";

export const noteState = {
  notes: {},
  noteOrders: {},
};

const createNote = (note) => ({
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

export const noteSlice = createSlice({
  name: "note",
  initialState: noteState,
  reducers: {
    addNote(state, action) {
      const { columnId } = action.payload;
      const note = createNote(action.payload.note);
      const noteOrder = state.noteOrders[columnId] || [];
      return {
        ...state,
        noteOrders: {
          ...state.noteOrders,
          [columnId]: [note.id, ...noteOrder],
        },
        notes: { ...state.notes, [note.id]: note },
      };
    },
    editNote(state, action) {
      const { note } = action.payload;
      return {
        ...state,
        notes: {
          ...state.notes,
          [note.id]: note,
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
    reorderNotes(state, action) {
      const { noteOrders } = action.payload;
      return { ...state, noteOrders };
    },
    archiveNote(state, action) {
      const { id: archiveId, columnId } = action.payload;
      const noteOrder = state.noteOrders[columnId].filter(
        (id) => id !== archiveId
      );
      return {
        ...state,
        noteOrders: {
          ...state.noteOrders,
          [columnId]: noteOrder,
        },
        notes: {
          ...state.notes,
          [archiveId]: {
            ...state.notes[archiveId],
            archived: true,
          },
        },
      };
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
  },
});

const getNoteState = (state) => state[noteSlice.name];
export const getNotesSelector = (state) => getNoteState(state).notes;
export const getNoteOrders = (state) => getNoteState(state).noteOrders;
export const getNoteOrderByColumnId = (state, columnId) =>
  getNoteOrders(state)?.[columnId];

export const getNoteById = (state, id) => getNotes(state)?.[id];

export const noteActions = noteSlice.actions;
