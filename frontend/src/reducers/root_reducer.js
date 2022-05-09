import { combineReducers } from 'redux';
import session from './session_reducer';
import notes from './notes_reducer';
import errors from './errors_reducer';

const RootReducer = combineReducers({
  session,
  notes,
  errors
});

export default RootReducer;