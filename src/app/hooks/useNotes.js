import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  updateNote,
  removeNote,
  archiveNote,
} from "app/slices/notes";
import { getProjectById } from "app/hooks";

export const getNotesSelector = (state, projectId) =>
  getProjectById(state, projectId).notes;
export const getNoteById = (state, projectId, noteId) =>
  getNotesSelector(state, projectId)?.[noteId];

export function useNotes(projectId, columnId) {
  const dispatch = useDispatch();
  const notes =
    useSelector((state) => getNotesSelector(state, projectId)) || {};

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
