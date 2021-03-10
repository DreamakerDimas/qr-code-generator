import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import codesReducer from './codesReducer';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './usersReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  profile: profileReducer,
  qrCodes: codesReducer,
  users: usersReducer,
  user: userReducer,
});

export default rootReducer;
