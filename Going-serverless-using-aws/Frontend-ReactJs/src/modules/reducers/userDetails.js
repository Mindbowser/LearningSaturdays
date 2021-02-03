import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/updateObjects";

const initialState = {
    user: {},
};

export default (state = initialState, { type, data }) => {

    switch (type) {
        case actionTypes.SAVE_USER:
            return updateObject(state, { user: data });
        default:
            return state;
    }
};
