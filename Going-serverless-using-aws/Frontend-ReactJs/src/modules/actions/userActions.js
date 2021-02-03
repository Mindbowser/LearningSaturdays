import * as ActionTypes from "./actionTypes";

export const loginSuccess = data => ({
  type: ActionTypes.LOGIN_SUCCESS,
  data
});

export const logoutSuccess = () => ({ type: ActionTypes.LOGOUT_SUCCESS });

export const toggleMainLoader = data => ({
  type: ActionTypes.SHOW_OR_HIDE_MAIN_LOADER,
  data
});

export const saveUser = data => ({
  type: ActionTypes.SAVE_USER,
  data
});
