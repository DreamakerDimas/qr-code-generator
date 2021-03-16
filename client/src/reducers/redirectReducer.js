import { CODES_ACTIONS } from '../actions/actionTypes';

const {
  GET_PUBLIC_QR_CODE_REQUEST,
  GET_PUBLIC_QR_CODE_SUCCESS,
  GET_PUBLIC_QR_CODE_ERROR,
} = CODES_ACTIONS;

const initState = {
  isFetching: true,
  error: null,
  codeData: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_PUBLIC_QR_CODE_REQUEST:
      return {
        isFetching: true,
        error: null,
        codeData: null,
      };
    case GET_PUBLIC_QR_CODE_SUCCESS:
      return {
        isFetching: false,
        error: null,
        codeData: action.payload,
      };
    case GET_PUBLIC_QR_CODE_ERROR:
      return {
        isFetching: false,
        error: action.error,
        codeData: null,
      };
    default:
      return state;
  }
}
