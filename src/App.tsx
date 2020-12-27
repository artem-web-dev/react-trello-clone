import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCard, addList } from "./redux/actions";
import { v4 as uuidv4 } from "uuid";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Board from "./components/Board";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const firstListId = uuidv4();
    dispatch(addList({ listId: firstListId, listTitle: "TO DO" }));
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
        cardTitle: "Second card",
      })
    );
    dispatch(
      addCard({
        listId: firstListId,
        cardId: uuidv4(),
        cardTitle: "Third card",
      })
    );
    const secondListId = uuidv4();
    dispatch(addList({ listId: secondListId, listTitle: "IN PROGRESS" }));
    dispatch(
      addCard({
        listId: secondListId,
        cardId: uuidv4(),
        cardTitle: "First card",
      })
    );
    dispatch(
      addCard({
        listId: secondListId,
        cardId: uuidv4(),
        cardTitle: "Second card",
      })
    );
    dispatch(
      addCard({
        listId: secondListId,
        cardId: uuidv4(),
        cardTitle: "Third card",
      })
    );
    const thirdListId = uuidv4();
    dispatch(addList({ listId: thirdListId, listTitle: "DONE" }));
    dispatch(
      addCard({
        listId: thirdListId,
        cardId: uuidv4(),
        cardTitle: "First card",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense" style={{display: 'flex', justifyContent: 'center'}}>
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
