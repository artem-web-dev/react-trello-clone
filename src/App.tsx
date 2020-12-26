import React, { useEffect } from "react";
import Board from "./components/Board";
import { addCard, addList } from "./redux/actions";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const firstListId = uuidv4();
    dispatch(addList({ listId: firstListId, listTitle: "First list" }));
    dispatch(
      addCard({
        listId: firstListId,
        cardId: uuidv4(),
        cardTitle: "First card",
      })
    );
    dispatch(
      addCard({
        listId: firstListId,
        cardId: uuidv4(),
        cardTitle: "First card 2",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Trello
          </Typography>
        </Toolbar>
      </AppBar>
      <Board />
    </>
  );
};

export default App;
