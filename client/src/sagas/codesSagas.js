import { put, select } from 'redux-saga/effects';
import { CODES_ACTIONS } from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

const {
  GET_MY_CODES_REQUEST,
  GET_MY_CODES_SUCCESS,
  GET_MY_CODES_ERROR,
  CREATE_QR_CODE_REQUEST,
  CREATE_QR_CODE_SUCCESS,
  CREATE_QR_CODE_ERROR,
} = CODES_ACTIONS;

export function* getMyCodesSaga(action) {
  yield put({ type: GET_MY_CODES_REQUEST });
  try {
    const { data } = yield restController.getMyCodesRequest();

    yield put({ type: GET_MY_CODES_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: GET_MY_CODES_ERROR, error: err.response });
  }
}

export function* createQRCodeSaga(action) {
  yield put({ type: CREATE_QR_CODE_REQUEST });
  try {
    const { data } = yield restController.createQRCode(action.payload);

    let { codesArr } = yield select((state) => state.qrCodes);
    codesArr.unshift(data);

    yield put({ type: CREATE_QR_CODE_SUCCESS, payload: codesArr });
  } catch (err) {
    yield put({ type: CREATE_QR_CODE_ERROR, error: err.response });
  }
}
