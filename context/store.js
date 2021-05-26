import React, { useReducer } from "react";

//Initialize the global state
const initialState = {};

//Craeting the context to pass to the components in the app tree
export const UserContext = React.createContext(initialState);

//Reducer function to set the value of global state
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return { ...state, user: action.payload };
    default:
      return { ...state };
  }
};

//Defining the global state and dispatching fucntion

//Defining the Store functional component to wrap the _app.js and all the components in the project
export const Store = (props) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ globalState, dispatch }}>{props.children}</UserContext.Provider>
  );
};
