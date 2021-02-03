const REDUX_STATE = "state";
const AUTHERIZAION_TOKEN = "AutherizationToken";
const SIDE_BAR_STATE = "sideBarState";
const REFRESH_TOKEN = "refreshToken";
const ID_TOKEN = "idToken";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(REDUX_STATE);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(REDUX_STATE, serializedState);
  } catch (err) {
    //log this
  }
};

export const saveToken = (accessToken, refreshToken, idToken) => {
  try {
    localStorage.setItem(AUTHERIZAION_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(ID_TOKEN, idToken);
  } catch (err) {
    console.log(err);
  }
};

export const retrieveRefreshToken = () => {
  let token = localStorage.getItem(REFRESH_TOKEN);
  return !token || token == null || token === "" ? "sdjnsc" : token;
};

export const retrieveToken = () => {
  let token = localStorage.getItem(ID_TOKEN);
  return !token || token == null || token === "" ? "sdjnsc" : token;
};

export const saveSideBarState = (sideBarState) => {
  try {
    localStorage.setItem(SIDE_BAR_STATE, sideBarState);
  } catch (err) {
    //log this
  }
};
