import { merge } from "lodash";
import {
  RECEIVE_NOTE_ERRORS,
  RECEIVE_NEW_NOTE,
  RECEIVE_UPDATED_NOTE,
  RECEIVE_DELETE_NOTE
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
    default:
      return prevState;
  }
};

export default notesErrorReducer;