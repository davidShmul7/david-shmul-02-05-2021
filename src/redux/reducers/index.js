import favoritesReducer from "./favorites";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  inFavorites: favoritesReducer,
});

export default allReducers;
