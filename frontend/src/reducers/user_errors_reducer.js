import {
  RECEIVE_UPDATED_USER,
  RECEIVE_USER_ERROR,
  RECEIVE_USERS
} from "../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions"
import {
  RECEIVE_USER_NOTES,
  RECEIVE_NOTES
} from '../actions/note_actions';

const _nullErrors = [];

const userErrorsReducer = (prevState = _nullErrors, action) => {
  Object.freeze(prevState);

  switch (action.type) {
    case RECEIVE_USER_ERROR:
      return action.error;
    case RECEIVE_UPDATED_USER:
      return action.user.data[1];
    // returning prevState in order to keep messages
    case RECEIVE_USER_NOTES:
      return prevState;
    case RECEIVE_CURRENT_USER:
      return prevState;
    case RECEIVE_USERS:
      return prevState;
    case RECEIVE_NOTES:
      return prevState;
    default:
      return _nullErrors;
  }
}

export default userErrorsReducer;