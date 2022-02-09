import React, { createContext, useReducer } from "react";

export const accountTypeContext = createContext();

const reducer = (state, pair) => ({ ...state, ...pair });

const initialState = {
  accountType: "0",
};

export function AccountProvider(props) {
  const [state, update] = useReducer(reducer, initialState);

  return (
    <accountTypeContext.Provider value={{ state, update }}>
      {props.children}
    </accountTypeContext.Provider>
  );
}
