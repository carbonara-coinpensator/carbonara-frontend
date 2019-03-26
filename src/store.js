import { createStore } from "redux";
import reducers from "./reducers/";

function configureStore(state = { testActionProp: true }) {
  return createStore(reducers,state);
}

export default configureStore;
