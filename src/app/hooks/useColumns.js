import { useDispatch, useSelector } from "react-redux";
import {
  columnActions,
  getColumnsSelector,
  getColumnOrder,
  getColumnById,
  fetchColumns,
  updateColumns,
  createColumn,
} from "app/slices/columns";

const { removeColumn, reorderColumns } = columnActions;

function useColumns() {
  const dispatch = useDispatch();
  const columns = useSelector(getColumnsSelector);
  const columnOrder = useSelector(getColumnOrder);

  return [
    { columns, columnOrder },
    {
      addColumn: function (payload) {
        const column = createColumn(payload);
        return dispatch(
          updateColumns({
            columns: {
              ...columns,
              [column.id]: column,
            },
            columnOrder: [...columnOrder, column.id],
          })
        );
      },
      editColumn: function (column) {
        return dispatch(
          updateColumns({
            columns: {
              ...columns,
              [column.id]: column,
            },
            columnOrder,
          })
        );
      },
      reorderColumns: function (columnOrder) {
        dispatch(reorderColumns({ columnOrder }));
        return dispatch(updateColumns({ columns, columnOrder }));
      },
      removeColumn: function (removeId) {
        const newColumnOrder = columnOrder.filter((id) => id !== removeId);
        return dispatch(
          updateColumns({
            columnOrder: newColumnOrder,
            columns: newColumnOrder.reduce(
              (acc, id) => ({ ...acc, [id]: columns[id] }),
              {}
            ),
          })
        );
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
