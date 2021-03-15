import { CODES_ACTIONS } from '../actions/actionTypes';
import { PAGINATION_LIMIT } from '../constants';

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
  CLEAR_MY_CODES,
} = CODES_ACTIONS;

const initState = {
  isFetching: true,
  error: null,
  codesArr: [],
  settings: {
    limit: PAGINATION_LIMIT,
    offset: 0,
  },
  haveMore: true,
};

export default function (state = initState, action) {
  switch (action.type) {
    case DELETE_MY_CODE_REQUEST:
    case UPDATE_MY_CODE_REQUEST:
    case GET_MY_CODES_REQUEST:
    case CREATE_QR_CODE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case GET_MY_CODES_SUCCESS:
      return {
        isFetching: false,
        error: null,
        codesArr: action.payload.codesArr,
        settings: action.payload.settings,
        haveMore: action.payload.haveMore,
      };
    case CREATE_QR_CODE_SUCCESS:
    case DELETE_MY_CODE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        codesArr: action.payload.codesArr,
        settings: action.payload.settings,
      };
    case UPDATE_MY_CODE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        codesArr: action.payload,
      };
    case DELETE_MY_CODE_ERROR:
    case UPDATE_MY_CODE_ERROR:
    case CREATE_QR_CODE_ERROR:
    case GET_MY_CODES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case CLEAR_MY_CODES:
      return initState;
    default:
      return state;
  }
}
