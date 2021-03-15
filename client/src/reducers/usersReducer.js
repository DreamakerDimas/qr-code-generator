import { ADMIN_ACTIONS } from '../actions/actionTypes';
import { PAGINATION_LIMIT } from '../constants';

const {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CLEAR_ALL_USERS,
} = ADMIN_ACTIONS;

const initState = {
  isFetching: true,
  error: null,
  usersArr: [],
  settings: {
    limit: PAGINATION_LIMIT,
    offset: 0,
  },
  haveMore: true,
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
        usersArr: action.payload.usersArr,
        settings: action.payload.settings,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        usersArr: action.payload.usersArr,
        settings: action.payload.settings,
        haveMore: action.payload.haveMore,
      };
    case CREATE_USER_ERROR:
    case GET_USERS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case CLEAR_ALL_USERS:
      return initState;
    default:
      return state;
  }
}
