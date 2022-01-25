import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProjects,
  getProject,
  postNotesReorder,
  postColumnsReorder,
} from "app/apis";
import { extraReducers as columnExtraReducers } from "app/slices/columns";
import { extraReducers as noteExtraReducers } from "app/slices/notes";

export const projectState = {
  projectList: [],
  projects: {
    // [projectId]: {
    //   columns: {},
    //   columnOrder: [],
    //   notes: {},
    //   noteOrders: {},
    // }
  },
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (projectId) => {
    const resp = await getProjects();
    return resp.data;
  }
);

export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async (projectId) => {
    const resp = await getProject(projectId);
    return resp.data;
  }
);

export const reorderColumns = createAsyncThunk(
  "project/reorderColumns",
  async (payload) => {
    const resp = await postColumnsReorder(payload);
    return resp.data;
  }
);

export const reorderNotes = createAsyncThunk(
  "project/reorderNotes",
  async (payload) => {
    const resp = await postNotesReorder(payload);
    return resp.data;
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState: projectState,
  reducers: {
    reorderNotes(state, action) {
      const { noteOrders, projectId } = action.payload;
      const project = state.projects[projectId];
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...project,
            noteOrders,
          },
        },
      };
    },
    reorderColumns(state, action) {
      const { columnOrder, projectId } = action.payload;
      const project = state.projects[projectId];
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...project,
            columnOrder,
          },
        },
      };
    },
  },
  extraReducers: {
    ...columnExtraReducers,
    ...noteExtraReducers,
    [fetchProjects.fulfilled.type]: (state, action) => {
      const { projectList } = action.payload;
      return {
        ...state,
        projectList,
      };
    },
    [fetchProject.fulfilled.type]: (state, action) => {
      const { id, notes, noteOrders, columns, columnOrder } = action.payload;
      return {
        ...state,
        projects: {
          ...state.projects,
          [id]: {
            notes,
            noteOrders,
            columns,
            columnOrder,
          },
        },
      };
    },
    [reorderNotes.fulfilled.type]: (state, action) => {
      const { noteOrders, projectId } = action.payload;
      const project = state.projects[projectId];
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...project,
            noteOrders,
          },
        },
      };
    },
    [reorderColumns.fulfilled.type]: (state, action) => {
      const { columnOrder, projectId } = action.payload;
      const project = state.projects[projectId];
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...project,
            columnOrder,
          },
        },
      };
    },
  },
});

export const projectActions = projectSlice.actions;
export const projectSliceName = projectSlice.name;
