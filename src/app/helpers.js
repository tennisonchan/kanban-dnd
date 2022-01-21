import { NOTE_STATUE } from "app/constants";

export const reorderList = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const calculateOrder = (objectMap, source, destination) => {
  const current = [...objectMap[source.droppableId]];
  const next = [...objectMap[destination.droppableId]];
  const item = current[source.index];

  // moving to same column
  if (source.droppableId === destination.droppableId) {
    return {
      ...objectMap,
      [source.droppableId]: reorderList(
        current,
        source.index,
        destination.index
      ),
    };
  }

  // moving to different columns
  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, item);

  return {
    ...objectMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };
};

export const isNoteOpenStatus = (noteStatus) => noteStatus === NOTE_STATUE.OPEN;
