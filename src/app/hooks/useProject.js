import { useDispatch, useSelector } from "react-redux";
import {
  projectActions,
  fetchProject,
  reorderNotes,
  reorderColumns,
  removeProject,
  updateProject,
} from "app/slices/projects";
import { selectColumnOrder, selectNoteOrders } from "app/selectors";

export function useProject(projectId) {
  const dispatch = useDispatch();
  const columnOrder =
    useSelector((state) => selectColumnOrder(state, projectId)) || [];
  const noteOrders =
    useSelector((state) => selectNoteOrders(state, projectId)) || {};

  return [
    { columnOrder, noteOrders },
    {
      reorderColumns: function (columnOrder) {
        dispatch(projectActions.reorderColumns({ projectId, columnOrder }));
        return dispatch(reorderColumns({ projectId, columnOrder }));
      },
      reorderNotes: function (noteOrders) {
        dispatch(projectActions.reorderNotes({ projectId, noteOrders }));
        return dispatch(reorderNotes({ noteOrders, projectId }));
      },
      fetchProject: function (projectId) {
        return dispatch(fetchProject(projectId));
      },
      editProject: function (project) {
        return dispatch(updateProject(project));
      },
      removeProject: function (id) {
        return dispatch(removeProject(id));
      },
    },
  ];
}
