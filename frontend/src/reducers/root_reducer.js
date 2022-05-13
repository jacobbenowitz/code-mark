import { combineReducers } from 'redux';
import session from './session_reducer';
import notes from './notes_reducer';
import errors from './errors_reducer';
import comments from './comments_reducer';
import users from './users_reducer';

const RootReducer = combineReducers({
  session,
  notes,
  errors,
  comments,
  users
});

export default RootReducer;