import {
  RECEIVE_NEW_NOTE,
  RECEIVE_NOTES,
  RECEIVE_USER_NOTES,
  RECEIVE_DELETE_NOTE,
  RECEIVE_UPDATED_NOTE
} from '../actions/note_actions';

const initialState = {
  all: {},
  user: {},
  new: undefined
};

const notesReducer = (prevState = initialState, action) => {
  Object.freeze(prevState);
  let nextState = Object.assign({}, prevState)
  switch (action.type) {
    case RECEIVE_NEW_NOTE:
      nextState.new = action.note.data;
      return nextState;
    case RECEIVE_USER_NOTES:
      nextState.user = action.notes.data;
      return nextState;
    case RECEIVE_NOTES:
      nextState.all = action.notes.data;
    case RECEIVE_DELETE_NOTE:
      delete nextState.all[action.noteId.data]
      delete nextState.user[action.noteId.data]
      return nextState;
    case RECEIVE_UPDATED_NOTE:
      nextState.all[action.note.data.id] = action.note.data
      nextState.user[action.noteId.data.id] = action.note.data
      return nextState;
    default:
      return prevState;
  }
}

export default notesReducer;