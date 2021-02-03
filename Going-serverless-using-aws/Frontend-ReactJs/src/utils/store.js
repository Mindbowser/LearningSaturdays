import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { saveState, loadState } from "./localStorage";
import throttle from "lodash/throttle";
import rootReducer from "../modules/reducers/index";
import mySaga from "../modules/sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store

const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

store.subscribe(
  throttle(() => {
    saveState({
      user: store.getState().user,
      providerDetail: store.getState().providerDetail,
      userDetails: store.getState().userDetails,
      clientDetail: store.getState().clientDetail
    });
  }),
  1000
);

// then run the saga
// sagaMiddleware.run(mySaga);

export default store;
