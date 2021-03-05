import { PROFILE_ACTIONS } from '../actions/actionTypes';

const {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
} = PROFILE_ACTIONS;

const initState = {
  isFetching: true,
  error: null,
  data: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        data: null,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        data: action.payload,
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        data: null,
      };
    default:
      return state;
  }
}
