import {applyMiddleware, compose, createStore } from "redux";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export function configureStore(initialState) {
  var createStoreWithMiddleware;
  const logger = createLogger();
  const middleware = applyMiddleware(thunk, logger);

  createStoreWithMiddleware = compose(middleware);

  const store = createStoreWithMiddleware(createStore)(rootReducer,
                                                       initialState);

  if (module.hot) {
    module.hot
        .accept('./reducers', () => {
          const nextRootReducer = require('./reducers');
          store.replaceReducer(nextRootReducer);
        });
  }

  return store;
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
        ? reducer(state, action.payload)
        : state;
  };
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}
