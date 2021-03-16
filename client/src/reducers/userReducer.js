import { ADMIN_ACTIONS } from '../actions/actionTypes';
import { PAGINATION_LIMIT } from '../constants';

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
  CREATE_USER_CODE_REQUEST,
  CREATE_USER_CODE_SUCCESS,
  CREATE_USER_CODE_ERROR,
  UPDATE_USER_CODE_REQUEST,
  UPDATE_USER_CODE_SUCCESS,
  UPDATE_USER_CODE_ERROR,
  DELETE_USER_CODE_REQUEST,
  DELETE_USER_CODE_SUCCESS,
  DELETE_USER_CODE_ERROR,
  CLEAR_USER_CODES,
  CLEAR_USER,
} = ADMIN_ACTIONS;

const initState = {
  isFetching: true,
  isLoadingCodes: true,
  error: null,
  userData: null,
  userCodes: [],
  settings: {
    limit: PAGINATION_LIMIT,
    offset: 0,
  },
  haveMore: true,
};

export default function (state = initState, action) {
  switch (action.type) {
    case DELETE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case DELETE_USER_CODE_REQUEST:
    case UPDATE_USER_CODE_REQUEST:
    case CREATE_USER_CODE_REQUEST:
    case GET_USER_CODES_REQUEST:
      return {
        ...state,
        isLoadingCodes: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
    case GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        userData: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        userData: null,
        userCodes: [],
      };
    case GET_USER_CODES_SUCCESS:
      return {
        ...state,
        isLoadingCodes: false,
        error: null,
        userCodes: action.payload.codesArr,
        settings: action.payload.settings,
        haveMore: action.payload.haveMore,
      };
    case CREATE_USER_CODE_SUCCESS:
    case DELETE_USER_CODE_SUCCESS:
      return {
        ...state,
        isLoadingCodes: false,
        error: null,
        userCodes: action.payload.codesArr,
        settings: action.payload.settings,
      };
    case UPDATE_USER_CODE_SUCCESS:
      return {
        ...state,
        isLoadingCodes: false,
        error: null,
        userCodes: action.payload,
      };
    case DELETE_USER_ERROR:
    case UPDATE_USER_ERROR:
    case GET_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case DELETE_USER_CODE_ERROR:
    case UPDATE_USER_CODE_ERROR:
    case CREATE_USER_CODE_ERROR:
    case GET_USER_CODES_ERROR:
      return {
        ...state,
        isLoadingCodes: false,
        error: action.error,
      };
    case CLEAR_USER_CODES:
      return {
        ...state,
        userCodes: [],
      };
    case CLEAR_USER:
      return initState;
    default:
      return state;
  }
}
