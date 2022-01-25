import { useDispatch, useSelector } from "react-redux";
import { createColumn, updateColumn, removeColumn } from "app/slices/columns";
import { getProjectById } from "app/hooks";

export const getColumns = (state, projectId) =>
  getProjectById(state, projectId)?.columns;

export const getColumnById = (state, projectId, columnId) =>
  getColumns(state, projectId)?.[columnId];

export function useColumns(projectId) {
  const dispatch = useDispatch();
  const columns = useSelector((state) => getColumns(state, projectId)) || {};

  return [
    { columns },
    {
      addColumn: function (column) {
        return dispatch(createColumn({ ...column, projectId }));
      },
      editColumn: function (column) {
        return dispatch(updateColumn(column));
      },
      removeColumn: function (id) {
        return dispatch(removeColumn(id));
      },
    },
  ];
}

export default useColumns;
