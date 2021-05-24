import { createStore, compose } from "redux";
import reducer from "./reducer";

//Activation of the redux devTools
const composeEnhancers =
  (typeof window != "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, composeEnhancers());

export default store;
