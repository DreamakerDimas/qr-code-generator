import { put } from 'redux-saga/effects';
import { AUTH_ACTION } from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function* loginSaga(action) {
  yield put({ type: AUTH_ACTION.REQUEST });
  try {
    yield restController.loginRequest(action.payload);
    yield put({ type: AUTH_ACTION.SUCCESS });
    action.history.push('/');
  } catch (err) {
    yield put({ type: AUTH_ACTION.ERROR, error: err.response }); // !!!
  }
}
