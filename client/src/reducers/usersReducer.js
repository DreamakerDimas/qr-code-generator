import { ADMIN_ACTIONS } from '../actions/actionTypes';

const {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
} = ADMIN_ACTIONS;

const initState = {
  isFetching: true,
  error: null,
  usersArr: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case CREATE_USER_REQUEST:
    case GET_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
      };
    case GET_USERS_SUCCESS:
      return {
        isFetching: false,
        error: null,
        usersArr: action.payload,
      };
    case CREATE_USER_ERROR:
    case GET_USERS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
