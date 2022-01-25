import { useDispatch, useSelector } from "react-redux";
import {
  projectSliceName,
  projectActions,
  fetchProject,
  reorderNotes,
  reorderColumns,
} from "app/slices/projects";

const getProjectState = (state) => state[projectSliceName];
export const getProjectsSelector = (state) => getProjectState(state).projects;
export const getProjectById = (state, projectId) =>
  getProjectsSelector(state)?.[projectId] || {};
export const getColumnOrder = (state, projectId) =>
  getProjectById(state, projectId)?.columnOrder;
export const getNoteOrders = (state, projectId) =>
  getProjectById(state, projectId)?.noteOrders;
export const getNoteOrderByColumnId = (state, projectId, columnId) =>
  getNoteOrders(state, projectId)?.[columnId];

export function useProject(projectId) {
  const dispatch = useDispatch();
  const columnOrder =
    useSelector((state) => getColumnOrder(state, projectId)) || [];
  const noteOrders =
    useSelector((state) => getNoteOrders(state, projectId)) || {};

  return [
    { columnOrder, noteOrders },
    {
      reorderColumns: function (columnOrder) {
        dispatch(projectActions.reorderColumns({ columnOrder }));
        return dispatch(reorderColumns({ projectId, columnOrder }));
      },
      reorderNotes: function (noteOrders) {
        dispatch(projectActions.reorderNotes({ noteOrders }));
        return dispatch(reorderNotes({ noteOrders, projectId }));
      },
      fetchProject: function (projectId) {
        dispatch(fetchProject(projectId));
      },
    },
  ];
}
