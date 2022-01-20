/** @format */

import {
  createStore,
  compose,
  applyMiddleware,
} from "redux";
import mainReducer from "./mainReducer";
import createSagaMiddleware from "redux-saga";
import mySaga from "../sagas";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
// create the saga middleware
const sagaMiddleware =
  createSagaMiddleware();
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

const store = createStore(
  mainReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);
// then run the saga
sagaMiddleware.run(mySaga);
export default store;
