import { useDispatch, useSelector } from "react-redux";
import {
  columnActions,
  columnSlice,
  getColumns,
  getColumnOrder,
  getColumnById,
  fetchColumns,
} from "app/slices/columns";

const {
  addColumn,
  editColumn,
  // loadColumns,
  removeColumn,
  reorderColumns,
} = columnActions;

function useColumns() {
  const dispatch = useDispatch();
  const columns = useSelector(getColumns);
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
      loadColumns: function (payload) {
        dispatch(loadColumns(payload));
      },
      reorderColumns: function (columnOrder) {
        dispatch(reorderColumns({ columnOrder }));
      },
      removeColumn: function (id) {
        dispatch(removeColumn({ id }));
      },
      getColumnById,
      getColumnOrder,
    },
  ];
}

export default useColumns;
