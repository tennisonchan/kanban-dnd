import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Header from "app/components/Header";
import EmptyColumn from "app/components/EmptyColumn";
import ColumnBoard from "app/components/ColumnBoard";
import { useColumns, useNotes } from "app/hooks";
import { makeStyles } from "@mui/styles";
import ColumnModal from "app/components/ColumnModal";
import { reorderList, calculateOrder } from "app/helpers";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  columnsBoards: {
    display: "flex",
  },
  columnsContainer: {
    display: "flex",
    padding: theme.spacing(2),
  },
  newColumnButtonContainer: {},
  newColumnButton: {
    padding: "0 !important",
  },
  newColumnButtonText: {
    width: "315px",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderStyle: "dashed",
    textAlign: "center",
    border: `1px solid`,
    borderRadius: "6px",
  },
}));

function Home(props) {
  const [{ columnOrder = [] }, { addColumn, reorderColumns, fetchColumns }] =
    useColumns();
  const [{ noteOrders }, { reorderNotes, fetchNotes }] = useNotes();

  const classes = useStyles();
  const isNoColumns = !columnOrder.length;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateColumn = (column) => {
    addColumn(column);
    handleClose();
  };

  useEffect(() => {
    fetchColumns();
    fetchNotes();
  }, []);

  const onDragEnd = (result) => {
    const { type, destination, source } = result;
    const noDestination = !destination;
    const noChanges =
      destination?.index === source.index &&
      destination?.droppableId == source.droppableId;

    if (noDestination || noChanges) {
      return;
    }

    if (type === "COLUMN") {
      const newColumnOrder = reorderList(
        columnOrder,
        source.index,
        destination.index
      );
      reorderColumns(newColumnOrder);
      return;
    }

    const newNoteOrders = calculateOrder(noteOrders, source, destination);
    reorderNotes(newNoteOrders);
  };

  return (
    <>
      <Header />
      <div className={classes.columnsContainer}>
        {isNoColumns && <EmptyColumn onSubmit={handleCreateColumn} />}
        {!isNoColumns && (
          <>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId="columns"
                type="COLUMN"
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    className={classes.columnsBoards}
                  >
                    {columnOrder.map((columnId, index) => {
                      return (
                        <ColumnBoard
                          key={columnId}
                          columnId={columnId}
                          index={index}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div>
              <Button onClick={handleOpen} className={classes.newColumnButton}>
                <span className={classes.newColumnButtonText}>
                  + Add column
                </span>
              </Button>
              <ColumnModal
                title="Add a column"
                isOpen={isOpen}
                onClose={handleClose}
                onSubmit={handleCreateColumn}
                buttonText="Create column"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
