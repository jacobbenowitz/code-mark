import {
  RECEIVE_NEW_NOTE,
  RECEIVE_NOTES,
  RECEIVE_USER_NOTES
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
    default:
      prevState;
  }
}

export default notesReducer;