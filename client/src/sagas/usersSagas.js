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
  CREATE_USER_CODE_REQUEST,
  CREATE_USER_CODE_SUCCESS,
  CREATE_USER_CODE_ERROR,
  UPDATE_USER_CODE_REQUEST,
  UPDATE_USER_CODE_SUCCESS,
  UPDATE_USER_CODE_ERROR,
  DELETE_USER_CODE_REQUEST,
  DELETE_USER_CODE_SUCCESS,
  DELETE_USER_CODE_ERROR,
  FIND_USERS_REQUEST,
  FIND_USERS_SUCCESS,
  FIND_USERS_ERROR,
  CLEAR_ALL_USERS,
} = ADMIN_ACTIONS;

const getAllUsersLocation = (pathname, id) => {
  return pathname.replace(`/${id}`, '');
};

export function* getUsersSaga(action) {
  yield put({ type: GET_USERS_REQUEST });
  try {
    const {
      data: { usersArr, haveMore },
    } = yield restController.getUsers(action.settings);

    const { settings, usersArr: oldUsersArr } = yield select(
      (state) => state.users
    );
    const newSettings = {
      ...settings,
      offset: settings.offset + settings.limit,
    };
    const updatedUsersArr = [...oldUsersArr, ...usersArr];

    yield put({
      type: GET_USERS_SUCCESS,
      payload: { usersArr: updatedUsersArr, settings: newSettings, haveMore },
    });
  } catch (err) {
    yield put({ type: GET_USERS_ERROR, error: err.response });
  }
}

export function* findUsersSaga(action) {
  if (action.isSubmit) yield put({ type: CLEAR_ALL_USERS });

  yield put({ type: FIND_USERS_REQUEST });
  try {
    const { settings, usersArr: oldUsersArr } = yield select(
      (state) => state.users
    );

    const {
      data: { usersArr, haveMore },
    } = yield restController.findUsers({ user: action.payload, settings });

    const newSettings = {
      ...settings,
      offset: settings.offset + settings.limit,
    };
    const updatedUsersArr = [...oldUsersArr, ...usersArr];

    yield put({
      type: FIND_USERS_SUCCESS,
      payload: { usersArr: updatedUsersArr, settings: newSettings, haveMore },
    });
  } catch (err) {
    yield put({ type: FIND_USERS_ERROR, error: err.response });
  }
}

// for one user:
export function* createUserSaga(action) {
  yield put({ type: CREATE_USER_REQUEST });
  try {
    yield restController.createUser(action.payload);

    action.redirect();

    const { usersArr, settings } = select((state) => state.users);

    const updatedArr = [data, ...usersArr];
    const newSettings = { ...settings, offset: settings.offset++ };

    yield put({
      type: CREATE_USER_SUCCESS,
      payload: { usersArr: updatedArr, settings: newSettings },
    });
  } catch (err) {
    yield put({ type: CREATE_USER_ERROR, error: err.response });
  }
}

export function* updateUserSaga(action) {
  yield put({ type: UPDATE_USER_REQUEST });
  try {
    console.log(action.payload);
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

// user codes
export function* getUserCodesSaga(action) {
  yield put({ type: GET_USER_CODES_REQUEST });
  try {
    const {
      data: { codesArr, haveMore },
    } = yield restController.getUserCodes(action.payload);

    const { settings, userCodes: oldCodesArr } = yield select(
      (state) => state.user
    );

    const newSettings = {
      ...settings,
      offset: settings.offset + settings.limit,
    };
    const updatedArr = [...oldCodesArr, ...codesArr];

    yield put({
      type: GET_USER_CODES_SUCCESS,
      payload: { codesArr: updatedArr, settings: newSettings, haveMore },
    });
  } catch (err) {
    yield put({ type: GET_USER_CODES_ERROR, error: err.response });
  }
}

export function* createUserCodeSaga(action) {
  yield put({ type: CREATE_USER_CODE_REQUEST });
  try {
    const { data } = yield restController.createUserCode(action.payload);

    const { userCodes, settings } = yield select((state) => state.user);
    const codesArr = [data, ...userCodes];

    settings.offset++;

    yield put({
      type: CREATE_USER_CODE_SUCCESS,
      payload: { codesArr, settings },
    });
  } catch (err) {
    yield put({ type: CREATE_USER_CODE_ERROR, error: err.response });
  }
}

export function* updateUserCodeSaga(action) {
  yield put({ type: UPDATE_USER_CODE_REQUEST });
  try {
    const { data } = yield restController.updateUserCodeStatus(action.payload);

    const { userCodes } = yield select((state) => state.user);
    const updatedArr = userCodes.map((code) => {
      if (code.id === action.payload.id) return data;
      return code;
    });

    yield put({ type: UPDATE_USER_CODE_SUCCESS, payload: updatedArr });
  } catch (err) {
    yield put({ type: UPDATE_USER_CODE_ERROR, error: err.response });
  }
}

export function* deleteUserCodeSaga(action) {
  yield put({ type: DELETE_USER_CODE_REQUEST });

  try {
    yield restController.deleteUserCode(action.payload);

    const { userCodes, settings } = yield select((state) => state.user);
    const codesArr = userCodes.filter((code) => code.id !== action.payload.id);

    settings.offset--;

    yield put({
      type: DELETE_USER_CODE_SUCCESS,
      payload: { codesArr, settings },
    });
  } catch (err) {
    yield put({ type: DELETE_USER_CODE_ERROR, error: err.response });
  }
}
