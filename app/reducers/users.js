import {createReducer} from "../utils";

import {CREATE_USER_REQUEST,
        CREATE_USER_SUCCESS,
        CREATE_USER_FAILURE,
        DELETE_USER_REQUEST,
        DELETE_USER_SUCCESS,
        DELETE_USER_FAILURE,
        EDIT_USER_REQUEST,
        EDIT_USER_SUCCESS,
        EDIT_USER_FAILURE,
        SEARCH_USERS_REQUEST,
        SEARCH_USERS_SUCCESS,
        SEARCH_USERS_FAILURE} from "../constants";

const initialState = {
  // After every action we just trigger a new search. This is wasteful but
  // something more complicated for a sample app is a bit much.
  needsRefresh: false,
  users: [],
};

export default createReducer(initialState, {
  [CREATE_USER_SUCCESS]: (state) => {
    return Object.assign({}, state, {
      needsRefresh: true,
    });
  },
  [DELETE_USER_SUCCESS]: (state) => {
    return Object.assign({}, state, {
      needsRefresh: true,
    });
  },
  [EDIT_USER_SUCCESS]: (state) => {
    return Object.assign({}, state, {
      needsRefresh: true,
    });
  },
  [SEARCH_USERS_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      needsRefresh: false,
      users: payload,
    });
  },
});
