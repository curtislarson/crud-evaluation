import {applyMiddleware, compose, createStore } from "redux";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export function configureStore(initialState) {
  var createStoreWithMiddleware;
  const logger = createLogger();
  const middleware = applyMiddleware(thunk, logger);

  createStoreWithMiddleware = compose(middleware);

  const store = createStoreWithMiddleware(createStore)(rootReducer(),
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
