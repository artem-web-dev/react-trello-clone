import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EditCard from "./EditCard";
import { AppState } from "../../typedef";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    backgroundColor: "#ebecf0",
    borderRadius: "3px",
    boxShadow: "0 1px 0 rgba(9,30,66,.25)",
    marginBottom: "8px",
    minHeight: "40px",
    alignItems: "center",
    padding: "0px 8px",
    position: "relative",
  },
  cardTitle: {
    paddingRight: "25px",
    overflowWrap: "anywhere",
  },
  cardIcon: {
    position: "absolute",
    right: "5px",
  },
  cardYellow: {
    backgroundColor: "#ffff0096",
  },
  cardOrange: {
    backgroundColor: "#ff990096",
  },
  cardRed: {
    backgroundColor: "#ff000096",
  },
}));

type Props = {
  listId: string;
  cardId: string;
  index: number;
};

const Card: FC<Props> = ({ listId, cardId, index }) => {
  const classes = useStyles();
  const card = useSelector((state: AppState) => state.cardsByIdReducer[cardId]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const diffDays = (date: string | null | undefined) => {
    //@ts-ignore
    return Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
  };

  const yellow = diffDays(card.date) === 1 ? classes.cardYellow : "";
  const orange = diffDays(card.date) === 0 ? classes.cardOrange : "";
  const red = diffDays(card.date) <= -1 ? classes.cardRed : "";

  return (
    <>
      <Draggable draggableId={card._id} index={index}>
        {(provided) => (
          <Grid
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${classes.card} ${yellow} ${orange} ${red}`}
          >
            <EditIcon className={classes.cardIcon} onClick={handleOpen} />
            <Typography
              className={classes.cardTitle}
              variant="h6"
              color="inherit"
            >
              {card.text}
            </Typography>
          </Grid>
        )}
      </Draggable>

      <EditCard
        listId={listId}
        cardId={cardId}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default Card;
