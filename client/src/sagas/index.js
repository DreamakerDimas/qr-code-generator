import { takeLatest } from 'redux-saga/effects';
import {
  AUTH_ACTION,
  PROFILE_ACTIONS,
  CODES_ACTIONS,
} from '../actions/actionTypes';

//sagas import
import { loginSaga } from './authSagas';
import { getProfileSaga, updateProfileSaga } from './profileSagas';
import { getMyCodesSaga, createQRCodeSaga } from './codesSagas';

function* rootSaga() {
  yield takeLatest(AUTH_ACTION.LOGIN, loginSaga);
  yield takeLatest(PROFILE_ACTIONS.GET_PROFILE, getProfileSaga);
  yield takeLatest(PROFILE_ACTIONS.UPDATE_PROFILE, updateProfileSaga);
  yield takeLatest(CODES_ACTIONS.GET_MY_CODES, getMyCodesSaga);
  yield takeLatest(CODES_ACTIONS.CREATE_QR_CODE, createQRCodeSaga);
}

export default rootSaga;
