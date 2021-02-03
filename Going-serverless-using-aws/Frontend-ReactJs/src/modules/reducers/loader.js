import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/updateObjects";

const initialState = {
  mainLoader: false,
};

export default (state = initialState, { type, data }) => {
  switch (type) {
    case actionTypes.SHOW_OR_HIDE_MAIN_LOADER:
      return updateObject(state, {
        mainLoader: data,
      });

    default:
      return state;
  }
};
