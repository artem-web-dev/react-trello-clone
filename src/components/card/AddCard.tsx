import { ClickAwayListener, Grid, TextField } from "@material-ui/core";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addCard as add } from "../../redux/actions";
import { v4 as uuidv4 } from "uuid";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

type Props = {
  listId: string;
  toggleAddingCard: () => void;
};

const AddCard: FC<Props> = ({ listId, toggleAddingCard }) => {
  const dispatch = useDispatch();

  const [cardTitle, setCardTitle] = useState("");
  const handleChangeCardTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCardTitle(e.target.value);
  const addCard = () => {
    toggleAddingCard();
    const cardId = uuidv4();
    dispatch(add({ cardTitle, cardId, listId }));
  };
  const handleClickAwayCard = () => addCard();

  
  return (
    <ClickAwayListener onClickAway={handleClickAwayCard}>
      <Grid container justify="space-between" alignItems="center">
        <TextField
          value={cardTitle}
          variant="outlined"
          size="small"
          margin="dense"
          onChange={handleChangeCardTitle}
        />
        <SaveIcon onClick={() => addCard()} />
        <CloseIcon onClick={toggleAddingCard} />
      </Grid>
    </ClickAwayListener>
  );
};

export default AddCard;
