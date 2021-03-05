import { AUTH_ACTION } from '../actions/actionTypes';

const initState = {
  isFetching: false,
  error: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case AUTH_ACTION.REQUEST:
      return {
        isFetching: true,
        error: null,
      };
    case AUTH_ACTION.SUCCESS:
      return {
        isFetching: false,
        error: null,
      };
    case AUTH_ACTION.ERROR:
      return {
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
