import {
  RECEIVE_USER_ERROR
} from "../actions/user_actions"

const _nullErrors = [];

const userErrorsReducer = (prevState = _nullErrors, action) => {
  Object.freeze(prevState);

  switch (action.type) {
    case RECEIVE_USER_ERROR:
      return action.error;
    default:
      return prevState
  }
}

export default userErrorsReducer;