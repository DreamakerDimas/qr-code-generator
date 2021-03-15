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
  UPDATE_MY_CODE_REQUEST,
  UPDATE_MY_CODE_SUCCESS,
  UPDATE_MY_CODE_ERROR,
  DELETE_MY_CODE_REQUEST,
  DELETE_MY_CODE_SUCCESS,
  DELETE_MY_CODE_ERROR,
} = CODES_ACTIONS;

export function* getMyCodesSaga(action) {
  yield put({ type: GET_MY_CODES_REQUEST });
  try {
    const {
      data: { codesArr, haveMore },
    } = yield restController.getMyCodesRequest();

    const { settings } = yield select((state) => state.qrCodes);
    settings.offset = settings.offset + settings.limit;

    yield put({
      type: GET_MY_CODES_SUCCESS,
      payload: { codesArr, settings, haveMore },
    });
  } catch (err) {
    yield put({ type: GET_MY_CODES_ERROR, error: err.response });
  }
}

export function* createQRCodeSaga(action) {
  yield put({ type: CREATE_QR_CODE_REQUEST });
  try {
    const { data } = yield restController.createQRCode(action.payload);

    const { codesArr, settings } = yield select((state) => state.qrCodes);

    const updatedArr = [data, ...codesArr];
    settings.offset = setting.offset + 1;

    yield put({
      type: CREATE_QR_CODE_SUCCESS,
      payload: { updatedArr, settings },
    });
  } catch (err) {
    yield put({ type: CREATE_QR_CODE_ERROR, error: err.response });
  }
}

export function* updateQRCodeSaga(action) {
  yield put({ type: UPDATE_MY_CODE_REQUEST });
  try {
    const { data } = yield restController.updateMyCode(action.payload);

    const { codesArr } = yield select((state) => state.qrCodes);
    const updatedArr = codesArr.map((code) => {
      if (code.id === data.id) return data;
      return code;
    });

    yield put({ type: UPDATE_MY_CODE_SUCCESS, payload: updatedArr });
  } catch (err) {
    yield put({ type: UPDATE_MY_CODE_ERROR, error: err.response });
  }
}

export function* deleteQRCodeSaga(action) {
  yield put({ type: DELETE_MY_CODE_REQUEST });
  try {
    yield restController.deleteMyCode(action.payload);

    const { codesArr, settings } = yield select((state) => state.qrCodes);

    const updatedArr = codesArr.filter((code) => code.id !== action.payload);
    settings.offset = settings.offset - 1;

    yield put({
      type: DELETE_MY_CODE_SUCCESS,
      payload: { updatedArr, settings },
    });
  } catch (err) {
    yield put({ type: DELETE_MY_CODE_ERROR, error: err.response });
  }
}
