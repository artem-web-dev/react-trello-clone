export type BoardType = {
  lists: string[];
};
export type ListsByIdType = {
  [key: string]: List;
};
export type List = {
  _id: string;
  title: string;
  cards: string[];
};
export type CardByIdType = {
  [key: string]: Card;
};
export type Card = {
  _id: string;
  text: string;
  desc?: string;
  date?: string | null;
};
export type AddListType = {
  listId: string;
  listTitle: string;
};
export type MoveListType = {
  oldListIndex: number;
  newListIndex: number;
};
export type DelListType = {
  listId: string;
  cards: string[];
};
export type ChangeListTitleType = {
  listId: string;
  listTitle: string;
};
export type AddCardType = {
  listId: string;
  cardId: string;
  cardTitle: string;
};
export type MoveCardType = {
  oldCardIndex: number;
  newCardIndex: number;
  sourceListId: number;
  destListId: number;
};
export type DelCardType = {
  listId: string;
  cardId: string;
};
export type ChangeCardTitleType = {
  cardTitle: string;
  cardId: string;
  cardDescription: string;
  cardDate: string | null;
};
export interface AppState {
  boardReducer: BoardType;
  listsByIdReducer: ListsByIdType;
  cardsByIdReducer: CardByIdType;
}
