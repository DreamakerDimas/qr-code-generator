import {
  AUTH_ACTION,
  PROFILE_ACTIONS,
  CODES_ACTIONS,
  ADMIN_ACTIONS,
} from './actionTypes';

// *** AUTH ***
export const authActionLogin = (payload, history) => ({
  type: AUTH_ACTION.LOGIN,
  payload,
  history,
});
export const logoutAction = () => ({
  type: PROFILE_ACTIONS.CLEAR_PROFILE,
});

// *** PROFILE ***
export const getProfileAction = (history, location) => ({
  type: PROFILE_ACTIONS.GET_PROFILE,
  history,
  location,
});
export const updateProfileAction = (payload) => ({
  type: PROFILE_ACTIONS.UPDATE_PROFILE,
  payload,
});

// *** QR CODES ***
export const getMyCodes = (settings) => ({
  type: CODES_ACTIONS.GET_MY_CODES,
  settings,
});
export const createQRCode = (payload) => ({
  type: CODES_ACTIONS.CREATE_QR_CODE,
  payload,
});
export const updateMyCode = (payload) => ({
  type: CODES_ACTIONS.UPDATE_MY_CODE,
  payload,
});
export const deleteMyCode = (payload) => ({
  type: CODES_ACTIONS.DELETE_MY_CODE,
  payload,
});
export const clearMyCodesAction = () => ({
  type: CODES_ACTIONS.CLEAR_MY_CODES,
});

// *** QR CODE FOR REDIRECTION ***
export const getQrCodeAction = (payload) => ({
  type: CODES_ACTIONS.GET_PUBLIC_QR_CODE,
  payload,
});

// *** ADMIN ***
export const getUsersAction = (settings) => ({
  type: ADMIN_ACTIONS.GET_USERS,
  settings,
});
export const getUserAction = (payload) => ({
  type: ADMIN_ACTIONS.GET_USER,
  payload,
});
export const createUserAction = (payload, redirect) => ({
  type: ADMIN_ACTIONS.CREATE_USER,
  payload,
  redirect,
});
export const updateUserAction = (payload) => ({
  type: ADMIN_ACTIONS.UPDATE_USER,
  payload,
});
export const deleteUserAction = (payload, history) => ({
  type: ADMIN_ACTIONS.DELETE_USER,
  payload,
  history,
});
export const clearUserStoreAction = () => ({
  type: ADMIN_ACTIONS.CLEAR_USER,
});
export const clearAllUsersAction = () => ({
  type: ADMIN_ACTIONS.CLEAR_ALL_USERS,
});
export const findUsersAction = (payload, isSubmit = false) => ({
  type: ADMIN_ACTIONS.FIND_USERS,
  payload,
  isSubmit,
});

// *** ADMIN user_codes ***
export const getUserCodesAction = (payload) => ({
  type: ADMIN_ACTIONS.GET_USER_CODES,
  payload,
});
export const createUserCodeAction = (payload) => ({
  type: ADMIN_ACTIONS.CREATE_USER_CODE,
  payload,
});
export const updateUserCodeAction = (payload) => ({
  type: ADMIN_ACTIONS.UPDATE_USER_CODE,
  payload,
});
export const deleteUserCodeAction = (payload) => ({
  type: ADMIN_ACTIONS.DELETE_USER_CODE,
  payload,
});
export const clearUserCodesAction = () => ({
  type: ADMIN_ACTIONS.CLEAR_USER_CODES,
});
