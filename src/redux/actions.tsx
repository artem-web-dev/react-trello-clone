import { createAction } from "@reduxjs/toolkit";
import {
  AddListType,
  MoveListType,
  DelListType,
  ChangeListTitleType,
  AddCardType,
  MoveCardType,
  DelCardType,
  ChangeCardTitleType,
} from "../typedef";

export const addList = createAction<AddListType>("ADD_LIST");
export const moveList = createAction<MoveListType>("MOVE_LIST");
export const delList = createAction<DelListType>("DELETE_LIST");
export const changeListTitle = createAction<ChangeListTitleType>(
  "CHANGE_LIST_TITLE"
);

export const addCard = createAction<AddCardType>("ADD_CARD");
export const moveCard = createAction<MoveCardType>("MOVE_CARD");
export const delCard = createAction<DelCardType>("DELETE_CARD");
export const changeCardTitle = createAction<ChangeCardTitleType>(
  "CHANGE_CARD_TITLE"
);
