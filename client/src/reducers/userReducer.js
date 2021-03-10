import { ADMIN_ACTIONS } from '../actions/actionTypes';

const {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  GET_USER_CODES_REQUEST,
  GET_USER_CODES_SUCCESS,
  GET_USER_CODES_ERROR,
} = ADMIN_ACTIONS;

const initState = {
  isFetching: true,
  error: null,
  userData: null,
  userCodes: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_USER_CODES_REQUEST:
    case DELETE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
    case GET_USER_SUCCESS:
      return {
        isFetching: false,
        error: null,
        userData: action.payload,
        userCodes: [],
      };
    case DELETE_USER_SUCCESS:
      return {
        isFetching: false,
        error: null,
        userData: null,
        userCodes: [],
      };
    case GET_USER_CODES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        userCodes: action.payload,
      };
    case GET_USER_CODES_ERROR:
    case DELETE_USER_ERROR:
    case UPDATE_USER_ERROR:
    case GET_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
