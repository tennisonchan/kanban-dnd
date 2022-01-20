import React from "react";
import Container from "@mui/material/Container";
import Header from "app/components/Header";
import EmptyColumn from "app/components/EmptyColumn";
import ColumnBoard from "app/components/ColumnBoard";

function Home(props) {
  const { columns = {}, columnOrder = [] } = props;
  const isNoColumns = !columns.length;
  return (
    <>
      <Header />
      {isNoColumns && <EmptyColumn />}
      {!isNoColumns &&
        columnOrder.map((columnId) => {
          return <ColumnBoard column={columns[columnId]} />;
        })}
    </>
  );
}

export default Home;
