import React, { useReducer } from "react";

//Initialize the global state
const initialState = {};

//Craeting the context to pass to the components in the app tree
export const UserState = React.createContext(initialState);

//Reducer function to set the value of global state
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return { ...state, user: action.payload };
    default:
      return { ...state };
  }
};

//Defining the global state and dispatching fuxntion
const [globalState, dispatch] = useReducer(reducer, initialState);

//Defining the Store functional component to wrap the _app.js and all the components in the project
export default Store = (props) => (
  <UserState.Provider value={{ globalState, dispatch }}>{props.childeren}</UserState.Provider>
);
