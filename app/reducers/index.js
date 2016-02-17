import {combineReducers} from "redux";
import {routeReducer} from "redux-simple-router";

import users from "./users";

export default function() {
  return combineReducers({
    routing: routeReducer,
    users,
  });
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
        ? reducer(state, action.payload)
        : state;
  };
}
