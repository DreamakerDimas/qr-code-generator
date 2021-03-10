import { put, select } from 'redux-saga/effects';
import { ADMIN_ACTIONS } from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

const {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  GET_USER_CODES_REQUEST,
  GET_USER_CODES_SUCCESS,
  GET_USER_CODES_ERROR,
} = ADMIN_ACTIONS;

const getAllUsersLocation = (pathname, id) => {
  return pathname.replace(`/${id}`, '');
};

export function* getUsersSaga(action) {
  yield put({ type: GET_USERS_REQUEST });
  try {
    const { data } = yield restController.getUsers();

    yield put({ type: GET_USERS_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: GET_USERS_ERROR, error: err.response });
  }
}

// for one user:

export function* createUserSaga(action) {
  yield put({ type: CREATE_USER_REQUEST });
  try {
    yield restController.createUser(action.payload);
    action.redirect();
    yield put({ type: CREATE_USER_SUCCESS });
  } catch (err) {
    yield put({ type: CREATE_USER_ERROR, error: err.response });
  }
}

export function* updateUserSaga(action) {
  yield put({ type: UPDATE_USER_REQUEST });
  try {
    const { data } = yield restController.updateUser(action.payload);

    yield put({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: UPDATE_USER_ERROR, error: err.response });
  }
}

export function* getUserSaga(action) {
  yield put({ type: GET_USER_REQUEST });
  try {
    const { data } = yield restController.getUserById(action.payload);

    yield put({ type: GET_USER_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: GET_USER_ERROR, error: err.response });
  }
}

export function* deleteUserSaga(action) {
  yield put({ type: DELETE_USER_REQUEST });
  try {
    yield restController.deleteUser(action.payload);

    const { pathname } = action.history.location;
    const newPath = getAllUsersLocation(pathname, action.payload);

    action.history.push(newPath);
    yield put({ type: DELETE_USER_SUCCESS });
  } catch (err) {
    yield put({ type: DELETE_USER_ERROR, error: err.response });
  }
}

export function* getUserCodesSaga(action) {
  yield put({ type: GET_USER_CODES_REQUEST });
  try {
    const { data } = yield restController.getUserCodes(action.payload);

    yield put({ type: GET_USERS_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: GET_USERS_ERROR, error: err.response });
  }
}