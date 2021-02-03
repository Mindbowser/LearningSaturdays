import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/updateObjects";

const initialState = {
  profile: {}
};

export default (state = initialState, { type, data }) => {
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return updateObject(state, { profile: data });
    default:
      return state;
  }
};
