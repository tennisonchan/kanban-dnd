import React from "react";
import Container from "@mui/material/Container";
import Header from "app/components/Header";
import EmptyColumn from "app/components/EmptyColumn";
import ColumnBoard from "app/components/ColumnBoard";
import { useFetchColumns } from "app/hooks";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  columnsBoards: {
    display: "flex",
    height: "100%",
    padding: theme.spacing(2),
  },
}));

function Home(props) {
  const [{ columns = {}, columnOrder = [] }] = useFetchColumns();
  const classes = useStyles();
  console.log(columns, columnOrder);
  const isNoColumns = !columnOrder.length;
  return (
    <>
      <Header />
      {isNoColumns && <EmptyColumn />}
      {!isNoColumns && (
        <div className={classes.columnsBoards}>
          {columnOrder.map((columnId) => {
            return <ColumnBoard key={columnId} column={columns[columnId]} />;
          })}
        </div>
      )}
    </>
  );
}

export default Home;
