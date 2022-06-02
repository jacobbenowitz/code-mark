import { merge } from "lodash";
import { RECEIVE_UPDATED_COMMENT } from "../actions/comment_actions";
import {
  RECEIVE_NOTE_ERRORS,
  RECEIVE_NEW_NOTE,
  RECEIVE_UPDATED_NOTE,
  RECEIVE_DELETE_NOTE,
  RECEIVE_USER_NOTES
} from "../actions/note_actions";

const _nullErrors = [];

const notesErrorReducer = (prevState = _nullErrors, action) => {
  Object.freeze(prevState);
  let nextState = merge({},prevState);
  // debugger;
  switch (action.type) {
    case RECEIVE_NOTE_ERRORS:
      return action.errors;
    // case RECEIVE_NEW_NOTE:
    //   return action.note.data[1];
    case RECEIVE_UPDATED_NOTE:
      // debugger;
      return action.note.data[1];
    case RECEIVE_DELETE_NOTE:
      return action.note[1];
    // case RECEIVE_UPDATED_COMMENT:
    //   debugger;
    //   return _nullErrors;
    case RECEIVE_USER_NOTES:
      // debugger;
      return prevState;
    default:
      return _nullErrors;
      // return prevState;
  }
};

export default notesErrorReducer;