import { AUTH_ACTION, GET_PROFILE_ACTIONS } from './actionTypes';

export const authActionLogin = (payload) => {
  return {
    type: AUTH_ACTION.LOGIN,
    payload,
  };
};

export const getProfileAction = (payload) => {
  return {
    type: GET_PROFILE_ACTIONS.GET_PROFILE_REQUEST,
    payload,
  };
};
