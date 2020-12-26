import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { makeStyles, Button, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditListTitle from "./EditListTitle";
import Card from "../card/Card";
import AddCard from "../card/AddCard";
import { AppState } from "../../typedef";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "272px",
    minWidth: "272px",
    color: theme.palette.text.secondary,
    backgroundColor: "#fff",
    borderRadius: "3px",
    padding: "10px",
    marginRight: "10px",
    height: "fit-content",
  },
  listItems: {
    minHeight: "10px",
    maxHeight: "90vh",
  },
}));

type Props = {
  listId: string;
};

const List: FC<Props> = ({ listId }) => {
  const classes = useStyles();
  const list = useSelector((state: AppState) => state.listsByIdReducer[listId]);

  const [editingTitle, setEditingTitle] = useState(false);
  const toggleEditingTitle = () => setEditingTitle(!editingTitle);

  const [addingCard, setAddingCard] = useState(false);
  const toggleAddingCard = () => setAddingCard(!addingCard);

  return (
    <Grid className={classes.list}>
      {editingTitle ? (
        <EditListTitle
          listId={listId}
          toggleEditingTitle={toggleEditingTitle}
        />
      ) : (
        <Typography variant="h6" color="inherit" onClick={toggleEditingTitle}>
          {list.title}
        </Typography>
      )}
      <Droppable droppableId={list._id}>
        {(provided, _snapshot) => (
          <Grid className={classes.listItems} ref={provided.innerRef}>
            {list.cards &&
              list.cards.map((cardId: string, index: number) => (
                <Card
                  key={cardId}
                  cardId={cardId}
                  index={index}
                  listId={list._id}
                />
              ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
      {addingCard ? (
        <AddCard toggleAddingCard={toggleAddingCard} listId={listId} />
      ) : (
        <Button startIcon={<AddIcon />} onClick={toggleAddingCard}>
          Добавить карточку
        </Button>
      )}
    </Grid>
  );
};

export default List;
