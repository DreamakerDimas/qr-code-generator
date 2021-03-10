import { AUTH_ACTION, PROFILE_ACTIONS, CODES_ACTIONS } from './actionTypes';

// AUTH
export const authActionLogin = (payload, history) => {
  return {
    type: AUTH_ACTION.LOGIN,
    payload,
    history,
  };
};

export const logoutAction = () => {
  return {
    type: PROFILE_ACTIONS.CLEAR_PROFILE,
  };
};

// PROFILE
export const getProfileAction = () => {
  return {
    type: PROFILE_ACTIONS.GET_PROFILE,
  };
};

export const updateProfileAction = (payload) => {
  return {
    type: PROFILE_ACTIONS.UPDATE_PROFILE,
    payload,
  };
};

// QR CODES
export const getMyCodes = () => {
  return {
    type: CODES_ACTIONS.GET_MY_CODES,
  };
};

export const createQRCode = (payload) => {
  return {
    type: CODES_ACTIONS.CREATE_QR_CODE,
    payload,
  };
};
