import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import CloseIcon from "@material-ui/icons/Close";
import { Grid, TextField, Button } from "@material-ui/core";
import { addList } from "../../redux/actions";

type Props = {
  toggleAddingList: ()=> void
}


const AddList:FC<Props> = ({ toggleAddingList }) => {
  const dispatch = useDispatch();
  const [listTitle, setListTitle] = useState("");
  const handleChangeListTitle = (e: React.ChangeEvent<HTMLInputElement>) => setListTitle(e.target.value);
  const createList = () => {
    toggleAddingList();
    dispatch(addList({ listId: uuidv4(), listTitle: listTitle }));
  };
  const onEnter = (e: { keyCode: number; preventDefault: () => void; }) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      createList();
    }
  };

  return (
    <Grid container direction="column" style={{height:'fit-content', width: '270px', minWidth:'270px'}}>
      <TextField
      placeholder="Название колонки"
        variant="outlined"
        size="small" margin="dense"
        value={listTitle}
        onChange={handleChangeListTitle}
        onKeyDown={onEnter}
      />
      <Grid container alignItems="center">
        <Button onClick={createList}>Добавить колонку</Button>
        <CloseIcon onClick={toggleAddingList} />
      </Grid>
    </Grid>
  );
};

export default AddList;
