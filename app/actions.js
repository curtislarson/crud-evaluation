import { checkHttpStatus, parseJSON } from "./utils";
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
        SEARCH_USERS_FAILURE} from "./constants";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export function createUserRequest() {
  return {
    type: CREATE_USER_REQUEST,
  };
}

export function createUserSuccess(payload) {
  return {
    type: CREATE_USER_SUCCESS,
    payload: payload,
  };
}

export function createUserFailure() {
  return {
    type: CREATE_USER_FAILURE,
  };
}

export function createUser(name, age) {
  return function(dispatch) {
    dispatch(createUserRequest());
    return fetch("/v1/users", {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: name, age: age}),
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(createUserSuccess({userId: response.id}));
        } catch (e) {
          dispatch(createUserFailure(e));
        }
      })
      .catch(error => {
        dispatch(createUserFailure(error));
      });
  };
}

export function deleteUserRequest() {
  return {
    type: DELETE_USER_REQUEST,
  };
}

export function deleteUserSuccess() {
  return {
    type: DELETE_USER_SUCCESS,
  };
}

export function deleteUserFailure() {
  return {
    type: DELETE_USER_FAILURE,
  };
}

export function deleteUser(userId) {
  return function(dispatch) {
    dispatch(deleteUserRequest());
    return fetch("/v1/users/" + userId, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(checkHttpStatus)
      .then(() => {
        try {
          dispatch(deleteUserSuccess());
        } catch (e) {
          dispatch(deleteUserFailure(e));
        }
      })
      .catch(error => {
        dispatch(deleteUserFailure(error));
      });
  };
}

export function editUserRequest() {
  return {
    type: EDIT_USER_REQUEST,
  };
}

export function editUserSuccess(payload) {
  return {
    type: EDIT_USER_SUCCESS,
    payload: payload,
  };
}

export function editUserFailure() {
  return {
    type: EDIT_USER_FAILURE,
  };
}

export function editUser(id, name, age) {
  var body = {};
  if (name) {
    body.name = name;
  }
  if (age) {
    body.age = age;
  }
  return function(dispatch) {
    dispatch(editUserRequest());
    return fetch("/v1/users/" + id, {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(editUserSuccess({userId: response.id}));
        } catch (e) {
          dispatch(editUserFailure(e));
        }
      })
      .catch(error => {
        dispatch(editUserFailure(error));
      });
  };
}

export function searchUsersRequest() {
  return {
    type: SEARCH_USERS_REQUEST,
  };
}

export function searchUsersSuccess(payload) {
  return {
    type: SEARCH_USERS_SUCCESS,
    payload: payload,
  };
}

export function searchUsersFailure() {
  return {
    type: SEARCH_USERS_FAILURE,
  };
}

export function searchUsers(name, age, limit, skip) {
  return function(dispatch) {
    dispatch(searchUsersRequest());
    return fetch("/v1/users/search", {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: name, age: age, limit: limit, skip: skip}),
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(searchUsersSuccess(response));
        } catch (e) {
          dispatch(searchUsersFailure(e));
        }
      })
      .catch(error => {
        dispatch(searchUsersFailure(error));
      });
  };
}