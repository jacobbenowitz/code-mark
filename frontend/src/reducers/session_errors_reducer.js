import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN,
  RECEIVE_USER_LOGOUT,
} from '../actions/session_actions';
import { RECEIVE_DELETED_USER } from '../actions/user_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  // debugger;
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    case RECEIVE_DELETED_USER:
      return action.userId.data[1];
    case RECEIVE_USER_SIGN_IN:
      // debugger;
      return action.message;
    case RECEIVE_USER_LOGOUT:
      return action.message;
    default:
      // return state;
      return _nullErrors;
  }
};

export default SessionErrorsReducer;