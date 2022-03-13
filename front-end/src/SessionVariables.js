import React, { createContext, useReducer } from "react";
/**
 * @param void
 * @returns accountTypeContext
 * Creates a context using React's create context.
 * That context will be returnted.
 */
export const accountTypeContext = createContext();

/**
 *
 * @param (state, action)
 * @returns new State.
 * Takes a state and an action and returns a new State
 * Very Simular to useState (var, setter) => state is updated.
 */
const reducer = (state, pair) => ({ ...state, ...pair });

/**
 * Initial Varibales that have default values
 */
const initialState = {
  accountType: "0",
  isLoggedIn: false,
  accountEmail: "",
};
/**
 *
 * @param props = initalState
 * @returns a Context provider that contains state, update
 * State will get values out of initalState
 * Update will change the values of initail state
 */
export function AccountProvider(props) {
  const [state, update] = useReducer(reducer, initialState);

  return (
    <accountTypeContext.Provider value={{ state, update }}>
      {props.children}
    </accountTypeContext.Provider>
  );
}
