import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCardTitle, delCard } from "../../redux/actions";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles, Button, Modal, TextField, Grid } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { AppState } from "../../typedef";

const useStyles = makeStyles((theme) => ({
  cardEdit: {
    padding: "50px",
    width: "50%",
    backgroundColor: "#fff",
    borderRadius: "5px",
    outline: "none",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editBtn: {
    paddingTop: "10px",
  },
}));

type Props = {
  listId: string;
  open: boolean;
  handleClose: () => void;
  cardId: string;
};

const EditCard: FC<Props> = ({ listId, open, handleClose, cardId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const card = useSelector((state: AppState) => state.cardsByIdReducer[cardId]);

  const [cardTitle, setCardTitle] = useState(card.text || "");
  const handleChangeCardTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCardTitle(e.target.value);
  const [cardDescription, setCardDescription] = useState(card.desc || "");
  const handleChangeCardDescription = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setCardDescription(e.target.value);
  const [cardDate, setCardDate] = useState<Date | null>(new Date());
  const handleChangeCardDate = (date: Date | null) => setCardDate(date);

  const editCard = () => {
    handleClose();
    dispatch(
      changeCardTitle({
        cardId: card._id,
        cardTitle: cardTitle,
        cardDescription,
        cardDate: cardDate && cardDate.toISOString(),
      })
    );
  };
  const deleteCard = () => dispatch(delCard({ cardId: card._id, listId }));

  return (
    <Modal className={classes.modal} open={open} onClose={handleClose}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.cardEdit}
      >
        <Grid container direction="column" justify="center">
          <TextField
            label="Название"
            value={cardTitle}
            onChange={handleChangeCardTitle}
          />
          <TextField
            label="Описание"
            value={cardDescription}
            onChange={handleChangeCardDescription}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              label="Дата"
              variant="inline"
              format="MM/dd/yyyy"
              margin="dense"
              value={cardDate}
              onChange={handleChangeCardDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <Grid className={classes.editBtn} container justify="space-evenly">
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => editCard()}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={deleteCard}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default EditCard;
