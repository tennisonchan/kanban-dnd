import { useEffect, useReducer } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const initialState = { columns: {}, columnOrder: [] };

function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "loadColumns":
      const { columns, columnOrder } = payload;
      return {
        ...state,
        columns,
        columnOrder,
      };
    case "addColumn":
      const newColumnId = uuid();
      const newColumn = { ...payload.column, id: newColumnId };
      return {
        ...state,
        columns: { ...state.columns, [newColumnId]: newColumn },
        columnOrder: [...state.columnOrder, newColumnId],
      };
    case "editColumn":
      const editColumn = payload.column;
      const editColumnId = payload.column.id;
      return {
        ...state,
        columns: { ...state.columns, [editColumnId]: editColumn },
      };
    default:
      return state;
  }
}

function useColumns() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addColumn(column) {
    dispatch({ type: "addColumn", payload: { column } });
  }

  function editColumn(column) {
    dispatch({ type: "editColumn", payload: { column } });
  }

  function loadColumns(payload) {
    dispatch({ type: "loadColumns", payload });
  }

  useEffect(() => {
    async function fetchColumns() {
      const resp = await axios.get("./dummy/columns.json");
      console.log(resp.data);
      loadColumns(resp.data);
    }
    fetchColumns();
  }, []);

  return [state, { addColumn, editColumn }];
}

export default useColumns;
