import { createReducer } from "@reduxjs/toolkit";
import { BoardType, CardByIdType, ListsByIdType } from "../../typedef";
import {
  addList,
  addCard,
  changeCardTitle,
  changeListTitle,
  delCard,
  delList,
  moveCard,
  moveList,
} from "../actions";

export const boardReducer = createReducer<BoardType>({ lists: [] }, (builder) =>
  builder
    .addCase(addList, (state, action) => {
      const { listId } = action.payload;
      return { lists: [...state.lists, listId] };
    })
    .addCase(moveList, (state, action) => {
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = Array.from(state.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return { lists: newLists };
    })
    .addCase(delList, (state, action) => {
      const { listId } = action.payload;
      const filterDeleted = (tmpListId: string) => tmpListId !== listId;
      const newLists = state.lists.filter(filterDeleted);
      return { lists: newLists };
    })
);

export const listsByIdReducer = createReducer<ListsByIdType>({}, (builder) =>
  builder
    .addCase(addList, (state, action) => {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, cards: [] },
      };
    })
    .addCase(changeListTitle, (state, action) => {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle },
      };
    })
    .addCase(delList, (state, action) => {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    })
    .addCase(addCard, (state, action) => {
      const { listId, cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] },
      };
    })
    .addCase(moveCard, (state, action) => {
      const {
        oldCardIndex,
        newCardIndex,
        sourceListId,
        destListId,
      } = action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards },
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards },
      };
    })
    .addCase(delCard, (state, action) => {
      const { cardId: deletedCardId, listId } = action.payload;
      const filterDeleted = (cardId: string) => cardId !== deletedCardId;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(filterDeleted),
        },
      };
    })
);

export const cardsByIdReducer = createReducer<CardByIdType>({}, (builder) =>
  builder
    .addCase(addCard, (state, action) => {
      const { cardTitle, cardId } = action.payload;
      return { ...state, [cardId]: { text: cardTitle, _id: cardId,  desc: '',
        date: '' } };
    })
    .addCase(changeCardTitle, (state, action) => {
      const { cardTitle, cardId, cardDescription, cardDate } = action.payload;
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          text: cardTitle,
          desc: cardDescription,
          date: cardDate,
        },
      };
    })
    .addCase(delCard, (state, action) => {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    })
    .addCase(delList, (state, action) => {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter((cardId) => !cardIds.includes(cardId))
        .reduce(
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    })
);

