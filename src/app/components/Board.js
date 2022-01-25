import React, { useState, useEffect } from "react";
import loadable from "@loadable/component";
import clsx from "clsx";
import Button from "@mui/material/Button";
import EmptyColumn from "app/components/EmptyColumn";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useProject, useColumns } from "app/hooks";
import { makeStyles } from "@mui/styles";
import { reorderList, calculateOrder } from "app/helpers";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSnackbar } from "notistack-v5";
import { useTranslation } from "react-i18next";

const ColumnModal = loadable(() => import("app/components/ColumnModal"));
const ColumnBoard = loadable(() => import("app/components/ColumnBoard"));

const useStyles = makeStyles((theme) => ({
  columnsBoards: {
    display: "flex",
  },
  columnsBoardsMediaQuery: {
    flexWrap: "wrap",
  },
  columnsContainer: {
    display: "flex",
    padding: theme.spacing(2),
  },
  columnContainerMediaQuery: {
    flexDirection: "column",
  },
  newColumnButton: {
    padding: "0 !important",
  },
  newColumnButtonText: {
    width: "calc(100vw - 32px)",
    maxWidth: "320px",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderStyle: "dashed",
    textAlign: "center",
    border: `1px solid`,
    borderRadius: "6px",
  },
}));

function Board(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [
    { columnOrder = [], noteOrders = {} },
    { fetchProject, reorderColumns, reorderNotes },
  ] = useProject(projectId);
  const [, { addColumn }] = useColumns(projectId);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const isNoColumns = !columnOrder.length;
  const [isOpen, setIsOpen] = useState(false);
  const isMediaQueryBreakPoint = useMediaQuery("(max-width:640px)");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateColumn = (column) => {
    addColumn(column).then(() => {
      enqueueSnackbar(t("Board.Snackbar.handleCreateColumn.text"), {
        autoHideDuration: 3000,
        variant: "success",
      });
    });

    handleClose();
  };

  useEffect(() => {
    fetchProject(projectId).then(({ error }) => {
      if (error) {
        navigate("/oops");
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = (result) => {
    const { type, destination, source } = result;
    const noDestination = !destination;
    const noChanges =
      destination?.index === source.index &&
      destination?.droppableId === source.droppableId;

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
    <div
      className={clsx(
        classes.columnsContainer,
        isMediaQueryBreakPoint && classes.columnContainerMediaQuery
      )}
    >
      {isNoColumns && <EmptyColumn onSubmit={handleCreateColumn} />}
      {!isNoColumns && (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="columns"
              type="COLUMN"
              direction={isMediaQueryBreakPoint ? "vertical" : "horizontal"}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className={clsx(
                    classes.columnsBoards,
                    isMediaQueryBreakPoint && classes.columnsBoardsMediaQuery
                  )}
                >
                  {columnOrder.map((columnId, index) => {
                    return (
                      <ColumnBoard
                        key={columnId}
                        projectId={projectId}
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
                {t("Board.Button.newColumnButtonText")}
              </span>
            </Button>
            <ColumnModal
              title={t("Board.ColumnModal.title")}
              isOpen={isOpen}
              onClose={handleClose}
              onSubmit={handleCreateColumn}
              buttonText={t("Board.ColumnModal.buttonText")}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Board;
