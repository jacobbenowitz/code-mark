import { merge } from "lodash";
import {
  RECEIVE_NOTE_ERRORS,
  RECEIVE_NEW_NOTE,
  RECEIVE_UPDATED_NOTE
} from "../actions/note_actions";

const _nullErrors = [];

const notesErrorReducer = (prevState = _nullErrors, action) => {
  Object.freeze(prevState);
  let nextState = merge({},prevState);
  switch (action.type) {
    case RECEIVE_NOTE_ERRORS:
      return action.errors;
    case RECEIVE_NEW_NOTE:
      return _nullErrors;
    case RECEIVE_UPDATED_NOTE:
      // debugger;
      return action.note.data[1];
    default:
      return prevState;
  }
};

export default notesErrorReducer;