import { useDispatch, useSelector } from "react-redux";
import {
  columnSlice,
  getColumns,
  getColumnOrder,
  getColumnById,
} from "app/slices/columns";

const { addColumn, editColumn, loadColumns } = columnSlice.actions;

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
      getColumnById,
    },
  ];
}

export default useColumns;
