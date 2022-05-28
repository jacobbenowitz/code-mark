import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import notesErrorReducer from './notes_errors_reducer';
import userErrorsReducer from './user_errors_reducer';
// import commentsErrorReducer from './comments_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  notes: notesErrorReducer,
  users: userErrorsReducer
  // comments: commentsErrorReducer
});