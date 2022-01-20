import React, { useState } from "react";
import Button from "@mui/material/Button";
import Header from "app/components/Header";
import EmptyColumn from "app/components/EmptyColumn";
import ColumnBoard from "app/components/ColumnBoard";
import { useColumns } from "app/hooks";
import { makeStyles } from "@mui/styles";
import AddColumnModal from "app/components/AddColumnModal";

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
  const [{ columns = {}, columnOrder = [] }] = useColumns();
  const classes = useStyles();
  console.log(columns, columnOrder);
  const isNoColumns = !columnOrder.length;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateColumn = (columnName) => {
    handleClose();
  };
  return (
    <>
      <Header />
      {isNoColumns && <EmptyColumn />}
      {!isNoColumns && (
        <div className={classes.columnsBoards}>
          {columnOrder.map((columnId) => {
            return <ColumnBoard key={columnId} column={columns[columnId]} />;
          })}
          <div className={classes.newColumnButtonContainer}>
            <Button onClick={handleOpen} className={classes.newColumnButton}>
              <span className={classes.newColumnButtonText}>+ Add column</span>
            </Button>
            <AddColumnModal
              isOpen={isOpen}
              onClose={handleClose}
              onSubmit={handleCreateColumn}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
