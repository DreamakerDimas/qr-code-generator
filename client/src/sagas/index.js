import { takeLatest } from 'redux-saga/effects';
import {
  AUTH_ACTION,
  PROFILE_ACTIONS,
  CODES_ACTIONS,
  ADMIN_ACTIONS,
} from '../actions/actionTypes';

//sagas import
import { loginSaga } from './authSagas';
import { getProfileSaga, updateProfileSaga } from './profileSagas';
import {
  getMyCodesSaga,
  createQRCodeSaga,
  updateQRCodeSaga,
  deleteQRCodeSaga,
  getQRCodeSaga,
} from './codesSagas';
import {
  createUserSaga,
  getUsersSaga,
  updateUserSaga,
  getUserSaga,
  deleteUserSaga,
  getUserCodesSaga,
  createUserCodeSaga,
  updateUserCodeSaga,
  deleteUserCodeSaga,
  findUsersSaga,
} from './usersSagas';

function* rootSaga() {
  yield takeLatest(AUTH_ACTION.LOGIN, loginSaga);
  // MY PROFILE
  yield takeLatest(PROFILE_ACTIONS.GET_PROFILE, getProfileSaga);
  yield takeLatest(PROFILE_ACTIONS.UPDATE_PROFILE, updateProfileSaga);
  // MY QR CODES
  yield takeLatest(CODES_ACTIONS.GET_MY_CODES, getMyCodesSaga);
  yield takeLatest(CODES_ACTIONS.CREATE_QR_CODE, createQRCodeSaga);
  yield takeLatest(CODES_ACTIONS.UPDATE_MY_CODE, updateQRCodeSaga);
  yield takeLatest(CODES_ACTIONS.DELETE_MY_CODE, deleteQRCodeSaga);
  yield takeLatest(CODES_ACTIONS.GET_PUBLIC_QR_CODE, getQRCodeSaga);
  // ADMIN
  yield takeLatest(ADMIN_ACTIONS.GET_USERS, getUsersSaga);
  yield takeLatest(ADMIN_ACTIONS.CREATE_USER, createUserSaga);
  yield takeLatest(ADMIN_ACTIONS.UPDATE_USER, updateUserSaga);
  yield takeLatest(ADMIN_ACTIONS.GET_USER, getUserSaga);
  yield takeLatest(ADMIN_ACTIONS.DELETE_USER, deleteUserSaga);
  yield takeLatest(ADMIN_ACTIONS.FIND_USERS, findUsersSaga);
  // ADMIN user_codes
  yield takeLatest(ADMIN_ACTIONS.GET_USER_CODES, getUserCodesSaga);
  yield takeLatest(ADMIN_ACTIONS.CREATE_USER_CODE, createUserCodeSaga);
  yield takeLatest(ADMIN_ACTIONS.UPDATE_USER_CODE, updateUserCodeSaga);
  yield takeLatest(ADMIN_ACTIONS.DELETE_USER_CODE, deleteUserCodeSaga);
}

export default rootSaga;
