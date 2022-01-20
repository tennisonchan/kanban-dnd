import { useEffect, useReducer } from "react";
import axios from "axios";

const initialState = { notes: {}, noteOrders: {} };

function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "addNote":
      const { note, columnId } = payload;
      const { noteOrders } = state;
      const noteOrder = noteOrders[columnId] || [];
      return {
        ...state,
        noteOrders: {
          ...noteOrders,
          [columnId]: [...noteOrder, note.id],
        },
        notes: { ...state.note, [note.id]: note },
      };
    case "addNotes":
      return {
        ...state,
        notes: payload.notes,
        noteOrders: payload.noteOrders,
      };
    default:
      return state;
  }
}

function useNotes() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addNote(note, columnId) {
    dispatch({ type: "addNote", payload: { note, columnId } });
  }

  function addNotes(payload) {
    dispatch({ type: "addNotes", payload });
  }

  useEffect(() => {
    async function fetchNotes() {
      const resp = await axios.get("./dummy/notes.json");
      console.log(resp.data);
      addNotes(resp.data);
    }
    fetchNotes();
  }, []);

  console.log({ state });
  return [state, { addNote, addNotes }];
}

export default useNotes;
