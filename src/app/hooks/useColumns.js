import { useEffect, useReducer } from "react";
import axios from "axios";

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
    case "addColumns":
      const newColumnIds = Object.keys(payload);
      return {
        ...state,
        columns: { ...state.columns, ...payload },
        columnOrder: [...state.columnOrder, ...newColumnIds],
      };
    default:
      return state;
  }
}

function useColumns() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addColumns(payload) {
    dispatch({ type: "addColumns", payload });
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

  console.log({ state });
  return [state, { addColumns }];
}

export default useColumns;
