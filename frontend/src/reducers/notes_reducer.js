import {
  RECEIVE_NEW_NOTE,
  RECEIVE_NOTES,
  RECEIVE_NOTE,
  RECEIVE_USER_NOTES,
  RECEIVE_DELETE_NOTE,
  RECEIVE_UPDATED_NOTE,
  RECEIVE_NOTE_LIKE,
  RECEIVE_NOTE_UNLIKE
} from '../actions/note_actions';

import { RECEIVE_NOTE_RESOURCES } from '../actions/webscrap_actions';

const initialState = {
  all: {},
  user: [],
  new: undefined,
  newResources: []
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
      nextState.user = Object.values(action.notes.data)
      return nextState;
    case RECEIVE_NOTES:
      nextState.all = action.notes.data;
      return nextState;
    case RECEIVE_NOTE:
      nextState.all[action.note.data._id] = action.note.data;
      return nextState;
    case RECEIVE_DELETE_NOTE:
      delete nextState.all[action.noteId]
      delete nextState.user[action.noteId]
      return nextState;
    case RECEIVE_UPDATED_NOTE:
      nextState.all[action.note.data._id] = action.note.data;
      return nextState;
    case RECEIVE_NOTE_RESOURCES:
      nextState.newResources = action.resources.data;
      return nextState;
    case RECEIVE_NOTE_LIKE:
      // find the note and replace it with updated
      let updatedLikes = Object.values(nextState.all).map(note => {
        if (note._id === action.note.data._id) {
          return action.note.data
        } else return note
      })
      return updatedLikes;
    case RECEIVE_NOTE_UNLIKE:
      // find the note and replace it with updated
      let updatedUnlike = Object.values(nextState.all).map(note => {
        if (note._id === action.note.data._id) {
          return action.note.data
        } else return note
      })
      return updatedUnlike;
    default:
      return prevState;
  }
}

export default notesReducer;