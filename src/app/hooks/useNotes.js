import { useDispatch, useSelector } from "react-redux";
import {
  noteSlice,
  getNotes,
  getNoteOrders,
  getNoteOrderByColumnId,
  getNoteById,
} from "app/slices/notes";

const { addNote, loadNotes } = noteSlice.actions;

function useNotes() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);
  const noteOrders = useSelector(getNoteOrders);

  return [
    { notes, noteOrders },
    {
      addNote: function (note, columnId) {
        dispatch(addNote({ note, columnId }));
      },
      loadNotes: function (payload) {
        dispatch(loadNotes(payload));
      },
      getNoteOrderByColumnId,
      getNoteById,
      getNotes,
      getNoteOrders,
    },
  ];
}

export default useNotes;
