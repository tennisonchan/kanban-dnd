import { useDispatch, useSelector } from "react-redux";
import {
  columnActions,
  getColumnsSelector,
  getColumnOrder,
  getColumnById,
  fetchColumns,
} from "app/slices/columns";

const { addColumn, editColumn, removeColumn, reorderColumns } = columnActions;

function useColumns() {
  const dispatch = useDispatch();
  const columns = useSelector(getColumnsSelector);
  const columnOrder = useSelector(getColumnOrder);

  return [
    { columns, columnOrder },
    {
      addColumn: function (column) {
        dispatch(addColumn({ column }));
      },
      editColumn: function (column) {
        dispatch(editColumn({ column }));
      },
      reorderColumns: function (columnOrder) {
        dispatch(reorderColumns({ columnOrder }));
      },
      removeColumn: function (id) {
        dispatch(removeColumn({ id }));
      },
      fetchColumns: function () {
        dispatch(fetchColumns());
      },
      getColumnById,
      getColumnOrder,
    },
  ];
}

export default useColumns;
