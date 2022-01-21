import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Header from "app/components/Header";
import EmptyColumn from "app/components/EmptyColumn";
import ColumnBoard from "app/components/ColumnBoard";
import { useColumns, useNotes } from "app/hooks";
import { makeStyles } from "@mui/styles";
import ColumnModal from "app/components/ColumnModal";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  columnsBoards: {
    display: "flex",
    height: "100%",
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
  const [{ columnOrder = [] }, { addColumn, loadColumns }] = useColumns();
  const [{ notes = {} }] = useNotes();
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
    async function fetchColumns() {
      const resp = await axios.get("./dummy/columns.json");
      console.log(resp.data);
      loadColumns(resp.data);
    }
    fetchColumns();
  }, []);

  return (
    <>
      <Header />
      {isNoColumns && <EmptyColumn onSubmit={handleCreateColumn} />}
      {!isNoColumns && (
        <div className={classes.columnsBoards}>
          {columnOrder.map((columnId) => {
            return (
              <ColumnBoard key={columnId} columnId={columnId} notes={notes} />
            );
          })}
          <div className={classes.newColumnButtonContainer}>
            <Button onClick={handleOpen} className={classes.newColumnButton}>
              <span className={classes.newColumnButtonText}>+ Add column</span>
            </Button>
            <ColumnModal
              title="Add a column"
              isOpen={isOpen}
              onClose={handleClose}
              onSubmit={handleCreateColumn}
              buttonText="Create column"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
