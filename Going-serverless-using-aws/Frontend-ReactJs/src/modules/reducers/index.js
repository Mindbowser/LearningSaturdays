// Combine all reducers and export root reducers

import { combineReducers } from "redux";
import * as actionTypes from "../actions/actionTypes";
import user from "./user";
import loader from "./loader";
import userDetails from "./userDetails";

const appReducer = combineReducers({
  user: user,
  loader: loader,
  userDetails: userDetails
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT_SUCCESS) {
    state = undefined;
    localStorage.clear();
  }
  return appReducer(state, action);
};

export default rootReducer;
