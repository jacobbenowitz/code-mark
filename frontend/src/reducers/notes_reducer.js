import {
  RECEIVE_NEW_NOTE,
  RECEIVE_NOTES,
  RECEIVE_NOTE,
  RECEIVE_USER_NOTES,
  RECEIVE_DELETE_NOTE,
  RECEIVE_UPDATED_NOTE
} from '../actions/note_actions';

const initialState = {
  all: [],
  user: [],
  new: undefined
};

const notesReducer = (prevState = initialState, action) => {
  Object.freeze(prevState);
  let nextState = Object.assign({}, prevState)
  switch (action.type) {
    case RECEIVE_NEW_NOTE:
      nextState.new = action.note.data;
      nextState.user.push(action.note.data);
      return nextState;
    case RECEIVE_USER_NOTES:
      nextState.user = Object.values(action.notes.data);
      return nextState;
    case RECEIVE_NOTES:
      nextState.all = action.notes.data;
      return nextState;
    case RECEIVE_NOTE:
      nextState.all[action.note.data._id] = action.note.data;
      return nextState;
    case RECEIVE_DELETE_NOTE:
      debugger
    /// NEED TO FILTER THROUGH ARRAY

    // delete nextState.all[action.noteId.data]
    // delete nextState.user[action.noteId.data]
    // return nextState;
    case RECEIVE_UPDATED_NOTE:
      debugger
      /// NEED TO FILTER THROUGH ARRAY

      nextState.all[action.note.data.id] = action.note.data
      nextState.user[action.noteId.data.id] = action.note.data
      return nextState;
    default:
      return prevState;
  }
}

export default notesReducer;