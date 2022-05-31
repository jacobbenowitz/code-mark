import { combineReducers } from 'redux';
import session from './session_reducer';
import notes from './notes_reducer';
import errors from './errors_reducer';
import comments from './comments_reducer';
import users from './users_reducer';

const AppReducer = combineReducers({
  session,
  notes,
  errors,
  comments,
  users
});

const RootReducer = (state,action) => {
  state.errors = {
    session: [],
    notes: [],
    comments: [],
    users: []
  };
  return AppReducer(state,action);
}

export default RootReducer;