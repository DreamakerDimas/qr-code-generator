import { put } from 'redux-saga/effects';
import { PROFILE_ACTIONS } from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

const {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} = PROFILE_ACTIONS;

export function* getProfileSaga(action) {
  yield put({ type: GET_PROFILE_REQUEST });
  try {
    const { data } = yield restController.getProfile();

    yield put({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: GET_PROFILE_ERROR, error: err.response });

    // if not a public - redirect
    if (!location.pathname.includes('/redirect/'))
      action.history.replace('/login');
  }
}

export function* updateProfileSaga(action) {
  yield put({ type: UPDATE_PROFILE_REQUEST });
  try {
    const { data } = yield restController.updateProfile(action.payload);

    yield put({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: UPDATE_PROFILE_ERROR, error: err.response });
  }
}
