import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  updateNote,
  removeNote,
  archiveNote,
} from "app/slices/notes";
import { selectNotes } from "app/selectors";

export function useNotes(projectId, columnId) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => selectNotes(state, projectId)) || {};

  return [
    { notes },
    {
      addNote: function (newNote) {
        return dispatch(createNote({ ...newNote, projectId, columnId }));
      },
      editNote: function (updatedNote) {
        return dispatch(updateNote({ ...updatedNote, projectId, columnId }));
      },
      removeNote: function (noteId) {
        return dispatch(removeNote({ noteId, columnId }));
      },
      archiveNote: function (noteId) {
        return dispatch(archiveNote({ noteId, projectId, columnId }));
      },
    },
  ];
}

export default useNotes;
