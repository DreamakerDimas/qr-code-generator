import { CODES_ACTIONS } from '../actions/actionTypes';

const {
  GET_MY_CODES_REQUEST,
  GET_MY_CODES_SUCCESS,
  GET_MY_CODES_ERROR,
  CREATE_QR_CODE_REQUEST,
  CREATE_QR_CODE_SUCCESS,
  CREATE_QR_CODE_ERROR,
} = CODES_ACTIONS;

const initState = {
  isFetching: true,
  error: null,
  codesArr: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    // GET PART
    case GET_MY_CODES_REQUEST:
    case CREATE_QR_CODE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case CREATE_QR_CODE_SUCCESS:
    case GET_MY_CODES_SUCCESS:
      return {
        isFetching: false,
        error: null,
        codesArr: action.payload,
      };
    case CREATE_QR_CODE_ERROR:
    case GET_MY_CODES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
