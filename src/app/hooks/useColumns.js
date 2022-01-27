import { useDispatch, useSelector } from "react-redux";
import { createColumn, updateColumn, removeColumn } from "app/slices/columns";
import { selectColumns } from "app/selectors";

export function useColumns(projectId) {
  const dispatch = useDispatch();
  const columns = useSelector((state) => selectColumns(state, projectId)) || {};

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
