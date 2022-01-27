import { createAsyncThunk } from "@reduxjs/toolkit";
import { postNote, patchNote, deleteNote, postNoteArchive } from "app/apis";

export const createNote = createAsyncThunk(
  "note/createNote",
  async (payload) => {
    const resp = await postNote(payload);
    return resp.data;
  }
);

export const updateNote = createAsyncThunk(
  "note/updateNote",
  async (payload) => {
    const resp = await patchNote(payload);
    return resp.data;
  }
);

export const removeNote = createAsyncThunk(
  "note/removeNote",
  async (payload) => {
    const resp = await deleteNote(payload);
    return resp.data;
  }
);

export const archiveNote = createAsyncThunk(
  "note/archiveNote",
  async (payload) => {
    const resp = await postNoteArchive(payload);
    return resp.data;
  }
);

export const extraReducers = {
  [createNote.fulfilled.type]: (state, action) => {
    const { note, noteOrders } = action.payload;
    const projectId = note.project;
    const project = state.projects[projectId];
    return {
      ...state,
      notes: {
        ...state.notes,
        [note.id]: note,
      },
      projects: {
        ...state.projects,
        [projectId]: {
          ...project,
          noteOrders,
        },
      },
    };
  },
  [updateNote.fulfilled.type]: (state, action) => {
    const { note } = action.payload;
    return {
      ...state,
      notes: {
        ...state.notes,
        [note.id]: note,
      },
    };
  },
  [removeNote.fulfilled.type]: (state, action) => {
    const { note, noteOrders } = action.payload;
    const projectId = note.project;
    const project = state.projects[projectId];
    const notes = { ...state.notes };
    delete notes[note.id];
    return {
      ...state,
      notes,
      projects: {
        ...state.projects,
        [projectId]: {
          ...project,
          noteOrders,
        },
      },
    };
  },
  [archiveNote.fulfilled.type]: (state, action) => {
    const { note, noteOrders } = action.payload;
    const projectId = note.project;
    const project = state.projects[projectId];
    return {
      ...state,
      notes: {
        ...state.notes,
        [note.id]: note,
      },
      projects: {
        ...state.projects,
        [projectId]: {
          ...project,
          noteOrders,
        },
      },
    };
  },
};
