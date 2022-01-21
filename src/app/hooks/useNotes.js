import { useDispatch, useSelector } from "react-redux";
import {
  noteSlice,
  getNotes,
  getNoteOrders,
  getNoteOrderByColumnId,
  getNoteById,
} from "app/slices/notes";

const { addNote, editNote, removeNote, loadNotes, reorderNotes, archiveNote } =
  noteSlice.actions;

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
      editNote: function (note) {
        dispatch(editNote({ note }));
      },
      loadNotes: function (payload) {
        dispatch(loadNotes(payload));
      },
      removeNote: function (id, columnId) {
        dispatch(removeNote({ id, columnId }));
      },
      reorderNotes: function (noteOrders) {
        dispatch(reorderNotes({ noteOrders }));
      },
      archiveNote: function (id, columnId) {
        dispatch(archiveNote({ id, columnId }));
      },
      getNoteOrderByColumnId,
      getNoteById,
      getNotes,
      getNoteOrders,
    },
  ];
}

export default useNotes;
