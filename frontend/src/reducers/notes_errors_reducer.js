import {
  RECEIVE_NOTE_ERRORS,
  RECEIVE_NEW_NOTE
} from "../actions/note_actions";

const _nullErrors = [];

const notesErrorReducer = (prevState = _nullErrors, action) => {
  Object.freeze(prevState);

  switch (action.type) {
    case RECEIVE_NOTE_ERRORS:
      return action.errors;
    case RECEIVE_NEW_NOTE:
      return _nullErrors;
    default:
      return prevState;
  }
};

export default notesErrorReducer;