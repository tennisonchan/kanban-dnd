import { useDispatch, useSelector } from "react-redux";
import {
  noteActions,
  getNotesSelector,
  getNoteOrders,
  getNoteOrderByColumnId,
  getNoteById,
  fetchNotes,
} from "app/slices/notes";

const { addNote, editNote, removeNote, reorderNotes, archiveNote } =
  noteActions;

function useNotes() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotesSelector);
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
      removeNote: function (id, columnId) {
        dispatch(removeNote({ id, columnId }));
      },
      reorderNotes: function (noteOrders) {
        dispatch(reorderNotes({ noteOrders }));
      },
      archiveNote: function (id, columnId) {
        dispatch(archiveNote({ id, columnId }));
      },
      fetchNotes: function () {
        dispatch(fetchNotes());
      },
      getNoteOrderByColumnId,
      getNoteById,
      getNotesSelector,
      getNoteOrders,
    },
  ];
}

export default useNotes;
