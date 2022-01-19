/** @format */

import {
  createStore,
  compose,
} from "redux";
import mainReducer from "./mainReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

const store = createStore(
  mainReducer,
  composeEnhancers()
);
export default store;
