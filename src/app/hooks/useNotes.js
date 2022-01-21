import { useDispatch, useSelector } from "react-redux";
import {
  noteActions,
  getNotesSelector,
  getNoteOrders,
  getNoteOrderByColumnId,
  getNoteById,
  fetchNotes,
  updateNotes,
  createNoteTemplate,
} from "app/slices/notes";

const { reorderNotes } = noteActions;

function useNotes() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotesSelector);
  const noteOrders = useSelector(getNoteOrders);

  return [
    { notes, noteOrders },
    {
      addNote: function (newNote, columnId) {
        const note = createNoteTemplate(newNote);
        const noteOrder = noteOrders[columnId] || [];
        return dispatch(
          updateNotes({
            noteOrders: {
              ...noteOrders,
              [columnId]: [note.id, ...noteOrder],
            },
            notes: { ...notes, [note.id]: note },
          })
        );
      },
      editNote: function (note) {
        return dispatch(
          updateNotes({
            notes: { ...notes, [note.id]: note },
            noteOrders,
          })
        );
      },
      removeNote: function (removeId, columnId) {
        const noteOrder = noteOrders[columnId].filter((id) => id !== removeId);
        return dispatch(
          updateNotes({
            noteOrders: {
              ...noteOrders,
              [columnId]: noteOrder,
            },
            notes: {
              ...notes,
              [removeId]: null,
            },
          })
        );
      },
      reorderNotes: function (noteOrders) {
        dispatch(reorderNotes({ noteOrders }));
        dispatch(updateNotes({ notes, noteOrders }));
      },
      archiveNote: function (archiveId, columnId) {
        const noteOrder = noteOrders[columnId].filter((id) => id !== archiveId);
        return dispatch(
          updateNotes({
            noteOrders: {
              ...noteOrders,
              [columnId]: noteOrder,
            },
            notes: {
              ...notes,
              [archiveId]: {
                ...notes[archiveId],
                archived: true,
              },
            },
          })
        );
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
