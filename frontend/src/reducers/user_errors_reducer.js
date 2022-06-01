import {
  RECEIVE_UPDATED_USER,
  RECEIVE_USER_ERROR
} from "../actions/user_actions"

const _nullErrors = [];

const userErrorsReducer = (prevState = _nullErrors, action) => {
  Object.freeze(prevState);

  switch (action.type) {
    case RECEIVE_USER_ERROR:
      return action.error;
    case RECEIVE_UPDATED_USER:
      return action.user.data[1];
    default:
      // return prevState;
      return _nullErrors;
  }
}

export default userErrorsReducer;