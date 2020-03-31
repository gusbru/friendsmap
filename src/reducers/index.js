import { combineReducers } from "redux";
import { map } from "./map.reducer";
import { groups } from "./groups.reducer";

const rootReducer = combineReducers({
  map,
  groups
});

export default rootReducer;
