import { combineReducers } from "redux";
import {
  boardReducer,
  listsByIdReducer,
  cardsByIdReducer,
} from "./trelloReducers";

export default combineReducers({
  boardReducer,
  listsByIdReducer,
  cardsByIdReducer,
});
