import { takeLatest } from 'redux-saga/effects';
import { AUTH_ACTION, PROFILE_ACTIONS } from '../actions/actionTypes';

//sagas import
import { loginSaga } from './authSagas';
import { getProfileSaga } from './profileSagas';

function* rootSaga() {
  yield takeLatest(AUTH_ACTION.LOGIN, loginSaga);
  yield takeLatest(PROFILE_ACTIONS.GET_PROFILE, getProfileSaga);
}

export default rootSaga;
